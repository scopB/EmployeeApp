using MongoDB.Bson;
using MongoDB.Driver;
using task.quiz;
using task.user;

namespace task.mainservice
{
    public class service
    {
        private PATH CONNECT_PATH = new PATH();
        private MongoClient connet()
        {
            var settings = CONNECT_PATH.CONNECTPATH;
            var client = new MongoClient(settings);
            return client;
        }

        public List<LIST_INSERT2> SHOW_QUIZ(string permission_find)
        {
            var client = connet();
            try
            {
                var database = client.GetDatabase("EMAPP");
                List<LIST_INSERT2> ans = new List<LIST_INSERT2>();
                var data = database.GetCollection<LIST_INSERT2>("QUIZ");
                var filter = Builders<LIST_INSERT2>.Filter.ElemMatch(x => x.permissions, x => x.permission == permission_find);
                var documents = data.Find(filter).ToList();
                return documents;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return null;
        }


        public Boolean INSERT_QUIZ(List<BODY_DATA> data, List<TEST> permission, string Q_NAME)
        {
            var client = connet();
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


    }

}