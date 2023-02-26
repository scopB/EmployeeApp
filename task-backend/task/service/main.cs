using MongoDB.Bson;
using MongoDB.Driver;
using task.quiz;
using task.score;
using task.user;



namespace task.mainservice
{
    public class service
    {
        private PATH CONNECT_PATH = new PATH();
        private MongoClient connect()
        {
            var settings = CONNECT_PATH.CONNECTPATH;
            var test = MongoClientSettings.FromConnectionString(CONNECT_PATH.CONNECTPATH);
            test.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(test);
            return client;
        }

        private static Random random = new Random();
        public string RANDOM_STRING()
        {
            var length = 24;
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public Boolean INSERT_DOC(DOC_FORM data, string year_doc)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("DOCUMENT");
                var test = database.GetCollection<DOC_FORM>(year_doc);
                var stringid = RANDOM_STRING();
                var data_insert = new DOC_FORM
                {
                    doc_id = stringid,
                    doc_createbyid = data.doc_createbyid,
                    doc_createdate = data.doc_createdate,
                    doc_foruserid = data.doc_foruserid,
                    doc_year = data.doc_year,
                    doc_yeartime = data.doc_yeartime,
                    st_lastsee = data.st_lastsee,
                    st_statuskpi = data.st_statuskpi,
                    doc_maintopic = data.doc_maintopic
                };
                var insertResult = test.InsertOneAsync(data_insert);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public List<DOC_FORM> SHOW_DOC_FOR_USER(int user_code, string year)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("DOCUMENT");
                List<DOC_FORM> show_data = new List<DOC_FORM>();
                var data = database.GetCollection<DOC_FORM>(year);
                var filter = Builders<DOC_FORM>.Filter.Eq(s => s.doc_foruserid, user_code);
                var documents = data.Find(filter).ToList();
                foreach (var i in documents)
                {
                    show_data.Add(i);
                }
                return show_data;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public Boolean UPDATE_STATUS_DOC(string doc_id, string status_update, string year)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("DOCUMENT");
                var data = database.GetCollection<DOC_FORM>(year);
                var filter = Builders<DOC_FORM>.Filter.Eq(s => s.doc_id, doc_id);
                var update = Builders<DOC_FORM>.Update.Set(s => s.st_statuskpi, status_update);
                var result = data.UpdateOneAsync(filter, update);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public Boolean UPDATE_LASTSEE_DOC(string doc_id, long st_lastsee, string year)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("DOCUMENT");
                var data = database.GetCollection<DOC_FORM>(year);
                var filter = Builders<DOC_FORM>.Filter.Eq(s => s.doc_id, doc_id);
                var update = Builders<DOC_FORM>.Update.Set(s => s.st_lastsee, st_lastsee);
                var result = data.UpdateOneAsync(filter, update);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public Boolean CREATE_ASSESSMENT(CREATE_ASSESSMENT_FORM data)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var test = database.GetCollection<CREATE_ASSESSMENT_FORM>("ASSESSMENT");
                var data_insert = new CREATE_ASSESSMENT_FORM
                {
                    am_year = data.am_year,
                    am_number_of_kpi = data.am_number_of_kpi,
                    am_createby = data.am_createby,
                    am_createdate = data.am_createdate,
                    am_enddate = data.am_enddate
                };
                var insertResult = test.InsertOneAsync(data_insert);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public List<CREATE_ASSESSMENT_FORM> SHOW_ASSESSMENT()
        {
            var client = connect();
            try
            {
                var result = new List<CREATE_ASSESSMENT_FORM>();
                var database = client.GetDatabase("EMAPP");
                var test = database.GetCollection<CREATE_ASSESSMENT_FORM>("ASSESSMENT");
                var list = test.Find(_ => true).ToList();
                foreach (var i in list)
                {
                    result.Add(i);
                }
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public List<CHECK_STATUS> CHECK_KPI_STATUS(int user_id, List<string> year)
        {
            var client = connect();
            try
            {
                var result = new List<CHECK_STATUS>();
                var database = client.GetDatabase("DOCUMENT");
                List<DOC_FORM> show_data = new List<DOC_FORM>();
                foreach (var i in year)
                {
                    var data = database.GetCollection<DOC_FORM>(i);
                    var filter = Builders<DOC_FORM>.Filter.Eq(s => s.doc_foruserid, user_id);
                    var documents = data.Find(filter).ToList();
                    foreach (var j in documents)
                    {
                        var temp = new CHECK_STATUS
                        {
                            doc_id = j.doc_id,
                            doc_year = j.doc_year,
                            status = j.st_statuskpi,
                            for_user = j.doc_foruserid
                        };
                        result.Add(temp);
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public Boolean UPDATE_DOC(UPDATE_DOC data)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("DOCUMENT");
                var collection = database.GetCollection<DOC_FORM>(data.year);
                var filter = Builders<DOC_FORM>.Filter.Eq(s => s.doc_id, data.doc_code);
                var update = Builders<DOC_FORM>.Update.Set(s => s.doc_maintopic,data.doc_maintopic).Set(s => s.st_statuskpi,"00");
                var result = collection.UpdateOneAsync(filter, update);
                return true;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public Boolean INSERT_SCORE(SUBMIT_SCORE data)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("SCORE");
                var test = database.GetCollection<SUBMIT_SCORE>(data.doc_year);
                var data_insert = new SUBMIT_SCORE
                {
                    doc_createbyid = data.doc_createbyid,
                    doc_foruserid = data.doc_foruserid,
                    doc_id = data.doc_id,
                    doc_score = data.doc_score,
                    doc_year = data.doc_year,
                    doc_yeartime = data.doc_yeartime,
                    doc_mode_id = 111,
                    maintopics = data.maintopics
                };
                var insertResult = test.InsertOneAsync(data_insert);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public Boolean UPDATE_SCORE(SUBMIT_SCORE data)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("SCORE");
                var collection = database.GetCollection<SUBMIT_SCORE>(data.doc_year);
                var filter = Builders<SUBMIT_SCORE>.Filter.Eq(s => s.doc_id, data.doc_id);
                var update = Builders<SUBMIT_SCORE>.Update.Set(s => s.maintopics,data.maintopics)
                .Set(s => s.doc_mode_id,112).Set(s=>s.doc_score,data.doc_score);
                var result = collection.UpdateOneAsync(filter, update);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public SUBMIT_SCORE SHOW_SHOW_WHO(string doc_id,string year)
        {
            var client = connect();
            try
            {
                var result = new SUBMIT_SCORE();
                var database = client.GetDatabase("SCORE");
                var collection = database.GetCollection<SUBMIT_SCORE>(year);
                var filter = Builders<SUBMIT_SCORE>.Filter.Eq(s => s.doc_id, doc_id);
                var documents = collection.Find(filter).ToList();
                foreach(var i in documents)
                {
                    result = i;
                }
                return result;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }


    }

}