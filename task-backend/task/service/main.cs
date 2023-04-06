using MongoDB.Bson;
using MongoDB.Driver;
using ore.structure;
using task.login;
using task.quiz;
using task.score;
using task.user;



namespace task.mainservice
{
    public class service
    {
        private PATH CONNECT_PATH = new PATH();
        private LOGIN_MANAGE LOGIN_C = new LOGIN_MANAGE();
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
                    doc_name = data.doc_name,
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

        public Boolean UPDATE_STATUS_DOC(string doc_id, string status_update, string year,long lastsee)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("DOCUMENT");
                var data = database.GetCollection<DOC_FORM>(year);
                var filter = Builders<DOC_FORM>.Filter.Eq(s => s.doc_id, doc_id);
                var update = Builders<DOC_FORM>.Update.Set(s => s.st_statuskpi, status_update).Set(s => s.st_lastsee,lastsee);
                var result = data.UpdateOneAsync(filter, update);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public Boolean INSERT_DENY_DOC(DENY_DOC data)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("DENY_DOC");
                var database_ = client.GetDatabase("DOCUMENT");
                var test = database.GetCollection<DENY_DOC>(data.doc_year);
                var data_ = database_.GetCollection<DOC_FORM>(data.doc_year);
                var filter = Builders<DOC_FORM>.Filter.Eq(s => s.doc_id, data.doc_id);
                var update = Builders<DOC_FORM>.Update.Set(s => s.doc_denyDetail, data.doc_denyDetail);
                var result = data_.UpdateOneAsync(filter, update);
                var insertResult = test.InsertOneAsync(data);
                UPDATE_STATUS_DOC(data.doc_id, "11", data.doc_year,data.doc_createdate);
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
                    am_enddate = data.am_enddate,
                    am_number_of_year = data.am_number_of_year,
                    am_name = data.am_name,
                    am_code = RANDOM_STRING()
                };
                var filter = Builders<CREATE_ASSESSMENT_FORM>.Filter.Eq(s => s.am_year, data.am_year);
                var documents = test.Find(filter).ToList();
                if (documents.Count == 0)
                {
                    var insertResult = test.InsertOneAsync(data_insert);
                }
                else
                {
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public Boolean EDIT_ASSESSMENT(CREATE_ASSESSMENT_FORM data)
        {
            try
            {
                var client = connect();
                var database = client.GetDatabase("EMAPP");
                var test = database.GetCollection<CREATE_ASSESSMENT_FORM>("ASSESSMENT");
                var filter = Builders<CREATE_ASSESSMENT_FORM>.Filter.Eq(s => s.am_code, data.am_code);
                var update = Builders<CREATE_ASSESSMENT_FORM>.Update.Set(s => s.am_createdate, data.am_createdate).
                Set(s => s.am_enddate, data.am_enddate).
                Set(s => s.am_name, data.am_name).
                Set(s => s.am_number_of_kpi, data.am_number_of_kpi).
                Set(s => s.am_number_of_year, data.am_number_of_year).
                Set(s => s.am_year, data.am_year);
                var result = test.UpdateOneAsync(filter, update);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public Boolean DELETE_ASSESSMENT(string code)
        {
            try
            {
                var client = connect();
                var database = client.GetDatabase("EMAPP");
                var test = database.GetCollection<CREATE_ASSESSMENT_FORM>("ASSESSMENT");
                var filter = Builders<CREATE_ASSESSMENT_FORM>.Filter.Eq(s => s.am_code, code);
                test.DeleteOne(filter);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public List<DENY_DOC> SHOW_DENY_DOC(string ass_year)
        {
            try
            {
                var result = new List<DENY_DOC>();
                var client = connect();
                var database = client.GetDatabase("DENY_DOC");
                var test = database.GetCollection<DENY_DOC>(ass_year);
                var all_user = LOGIN_C.SHOW_USER();
                foreach(var i in all_user)
                {
                    var filter = Builders<DENY_DOC>.Filter.Eq(s => s.doc_foruserid, i.ps_id);
                    var documents = test.Find(filter).ToList();
                    foreach(var j in documents)
                    {
                        result.Add(j);
                    }
                }
                return result;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }



        public List<SHOW_ASSEMENT_BY_USER> SHOW_ASS_USER(string ass_year)
        {
            try
            {
                var result = new List<SHOW_ASSEMENT_BY_USER>();
                var client = connect();
                var database = client.GetDatabase("DOCUMENT");
                var test = database.GetCollection<DOC_FORM>(ass_year);
                var all_user = LOGIN_C.SHOW_USER();
                foreach (var i in all_user)
                {
                    var filter = Builders<DOC_FORM>.Filter.Eq(s => s.doc_foruserid, i.ps_id);
                    var documents = test.Find(filter).ToList();
                    var boss = LOGIN_C.FIND_USER(i.ps_bossid);

                    if (documents.Count == 0)
                    {
                        var temp = new SHOW_ASSEMENT_BY_USER
                        {
                            for_user = i.ps_id,
                            ps_name = i.ps_name,
                            ps_lastname = i.ps_lastname,
                            doc_code = "-",
                            st_statuskpi = "999",
                            boss_id = i.ps_bossid,
                            boss_lastname = boss.ps_lastname,
                            boss_name = boss.ps_name,
                            st_lastsee = 0


                        };
                        result.Add(temp);
                    }
                    else
                    {
                        string doc_code = "";
                        string st_statuskpi = "";
                        long time = 0;
                        foreach (var j in documents)
                        {
                            doc_code = j.doc_id;
                            st_statuskpi = j.st_statuskpi;
                            time = j.st_lastsee;
                        }
                        var temp = new SHOW_ASSEMENT_BY_USER
                        {
                            for_user = i.ps_id,
                            ps_name = i.ps_name,
                            ps_lastname = i.ps_lastname,
                            doc_code = doc_code,
                            st_statuskpi = st_statuskpi,
                            boss_id = i.ps_bossid,
                            boss_lastname = boss.ps_lastname,
                            boss_name = boss.ps_name,
                            st_lastsee = time
                            
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
                            for_user = j.doc_foruserid,
                            st_lastsee = j.st_lastsee                           
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
                var update = Builders<DOC_FORM>.Update.Set(s => s.doc_maintopic, data.doc_maintopic).Set(s => s.st_statuskpi, data.status).Set(s => s.st_lastsee , data.last_see);
                var result = collection.UpdateOneAsync(filter, update);
                return true;
            }
            catch (Exception ex)
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
                    doc_name = data.doc_name,
                    doc_score = data.doc_score,
                    doc_year = data.doc_year,
                    doc_yeartime = data.doc_yeartime,
                    doc_mode_id = data.doc_mode_id,
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
                var update = Builders<SUBMIT_SCORE>.Update.Set(s => s.maintopics, data.maintopics)
                .Set(s => s.doc_mode_id, data.doc_mode_id).Set(s => s.doc_score, data.doc_score);
                var result = collection.UpdateOneAsync(filter, update);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public SUBMIT_SCORE SHOW_SHOW_WHO(string doc_id, string year,int mode)
        {
            var client = connect();
            try
            {
                var result = new SUBMIT_SCORE();
                var database = client.GetDatabase("SCORE");
                var collection = database.GetCollection<SUBMIT_SCORE>(year);
                var filter = Builders<SUBMIT_SCORE>.Filter.Eq(s => s.doc_id, doc_id);
                var documents = collection.Find(filter).ToList();
                foreach (var i in documents)
                {
                    if(i.doc_mode_id == mode)
                    {
                        result = i;
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

        public SUBMIT_SCORE FIND_BY_USER(INPUT_SEARCH_SCORE data)
        {
            {
                var client = connect();
                try
                {
                    var result = new SUBMIT_SCORE();
                    var database = client.GetDatabase("SCORE");
                    var collection = database.GetCollection<SUBMIT_SCORE>(data.year);
                    var temp_user = data.search_input;
                    var filter = Builders<SUBMIT_SCORE>.Filter.Eq(s => s.doc_foruserid, temp_user);
                    var documents = collection.Find(filter).ToList();
                    foreach (var i in documents)
                    {
                        result = i;
                    }
                    return result;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return null;
                }
            }
        }

        public List<SUBMIT_SCORE> FIND_BY_ORE(INPUT_SEARCH_SCORE data)
        {
            {
                var client = connect();
                try
                {
                    var result = new List<SUBMIT_SCORE>();
                    if (data.mode == 1)
                    {
                        var temp = FIND_BY_USER(data);
                        result.Add(temp);
                        return result;
                    }
                    var db = client.GetDatabase("EMAPP");
                    var collection = db.GetCollection<USER_STR_MONGO>("PS");
                    var temp_ore_id = data.search_input;
                    var filter = Builders<USER_STR_MONGO>.Filter.Eq(s => s.ps_org_id, temp_ore_id);
                    var documents = collection.Find(filter).ToList();
                    foreach (var i in documents)
                    {
                        var data_outside = new INPUT_SEARCH_SCORE
                        {
                            search_input = i.ps_id,
                            year = data.year,
                            mode = 0
                        };
                        var temp = FIND_BY_USER(data_outside);
                        if (temp.doc_id != string.Empty)
                        {
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
        }


    }

}