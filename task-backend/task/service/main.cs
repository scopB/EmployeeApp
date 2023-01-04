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

        public List<INSERT_SCORE> SHOW_SCORE(string quizname, string username)
        {
            var client = connect();
            var result = new List<INSERT_SCORE>();
            try
            {
                if (username == string.Empty)
                {
                    var db = client.GetDatabase("USER");
                    // var CollectionName = new List<string>();
                    foreach (var item in db.ListCollectionsAsync().Result.ToListAsync<BsonDocument>().Result)
                    {
                        var name = item["name"].ToString();
                        // Console.WriteLine(name);
                        var test = db.GetCollection<INSERT_SCORE>(name);
                        var doc = test.Find(x => x.Q_NAME == quizname).ToList();
                        foreach (var i in doc)
                        {
                            result.Add(i);
                        }
                    }
                    return result;
                }
                else if(quizname == string.Empty)
                {
                    var database = client.GetDatabase("USER");
                    var data = database.GetCollection<INSERT_SCORE>(username);
                    var value = data.Find(_ => true).ToList();
                    return value;
                }
                else 
                {
                    var database = client.GetDatabase("USER");
                    var data = database.GetCollection<INSERT_SCORE>(username);
                    var doc = data.Find(x => x.Q_NAME == quizname).ToList();
                    return doc;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return null;
        }

        public List<LIST_INSERT2> SHOW_QUIZ(string permission_find, string username)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                List<LIST_INSERT2> ans = new List<LIST_INSERT2>();
                var data = database.GetCollection<LIST_INSERT2>("QUIZ");
                var filter = Builders<LIST_INSERT2>.Filter.ElemMatch(x => x.permissions, x => x.permission == permission_find);
                var documents = data.Find(filter).ToList();
                database = client.GetDatabase("USER");
                var data2 = database.GetCollection<INSERT_SCORE>(username);
                var result = data2.Find(_ => true).ToList();
                if (!result.Any())
                {
                    return documents;
                }
                foreach (var doc in documents)
                {
                    var check = true;
                    foreach (var j in result)
                    {
                        if (Equals(doc.QUIZ_NAME,j.Q_NAME))
                        {
                            check = false;
                        }   
                    }
                    if(check == true)
                    {
                        ans.Add(doc);
                    }
                }
                return ans;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return null;
        }

        public Boolean SEND_SCORE(string username, string quiz_name, List<SCORE_BODY> result)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("USER");
                var test = database.GetCollection<INSERT_SCORE>(username);
                INSERT_SCORE data = new INSERT_SCORE
                {
                    username = username,
                    Q_NAME = quiz_name,
                    RESULT = result
                };
                var insertResult = test.InsertOneAsync(data);
                return true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return false;
        }


        public Boolean INSERT_QUIZ(List<BODY_DATA> data, List<TEST> permission, string Q_NAME)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var test = database.GetCollection<LIST_INSERT2>("QUIZ");
                var data_insert = new LIST_INSERT2
                {
                    INSERT_BODY = data,
                    permissions = permission,
                    QUIZ_NAME = Q_NAME
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



        

    }

}