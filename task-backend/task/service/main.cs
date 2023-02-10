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
        public Boolean INSERT_DOC (DOC_FORM data,string year_doc)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("DOCUMENT");
                var test = database.GetCollection<DOC_FORM>(year_doc);
                var data_insert = new DOC_FORM
                {
                    doc_id = data.doc_id,
                    doc_createbyid = data.doc_createbyid,
                    doc_createdate = data.doc_createdate,
                    doc_foruserid = data.doc_foruserid,
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

        public List<DOC_FORM> SHOW_DOC_FOR_USER (int user_code,string year)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("DOCUMENT");
                List<DOC_FORM> show_data = new List<DOC_FORM>();
                var data = database.GetCollection<DOC_FORM>(year);
                var filter = Builders<DOC_FORM>.Filter.Eq(s => s.doc_foruserid, user_code);
                var documents = data.Find(filter).ToList();
                foreach(var i in documents)
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

        public Boolean UPDATE_STATUS_DOC(int doc_id,string status_update,string year)
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
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public Boolean UPDATE_LASTSEE_DOC(int doc_id,long st_lastsee,string year)
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
            catch(Exception ex)
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
            catch(Exception ex)
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
                foreach(var i in list)
                {
                    result.Add(i);
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