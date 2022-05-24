using MongoDB.Bson;
using MongoDB.Driver;
using task.quiz;
using task.user;

namespace task.mainservice
{
    public class service
    {
        private MongoClient connet()
        {
            var settings = "mongodb+srv://admin:1234@emapp.2oey0.mongodb.net/?retryWrites=true&w=majority";
            var client = new MongoClient(settings);
            return client;
        }
        public List<List<LIST_INSERT>> GET_QUIZ()
        {
            var client = connet();
            List<List<LIST_INSERT>> ans = new List<List<LIST_INSERT>>();

            try
            {
                var database = client.GetDatabase("EMAPP");
                foreach (var item in database.ListCollectionsAsync().Result.ToListAsync<BsonDocument>().Result)
                {
                    // Console.WriteLine(item);
                    var COLL_NAME = item["name"].AsString;
                    // Console.WriteLine(ans);
                    var test = database.GetCollection<LIST_INSERT>(COLL_NAME);
                    var insertResult = test.Find(_ => true).ToList();
                    ans.Add(insertResult);
                }
                return ans;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                List<List<LIST_INSERT>> bad = new List<List<LIST_INSERT>>();
                return bad;
            }
        }

        public USER_OF_FETCH finduser(string username)
        {
            var client = connet();
            var database = client.GetDatabase("EMAPP");
            var data = database.GetCollection<USER_OF_FETCH>("USER");
            var query = data.Find(s => s.USERNAME == username).ToList();
            if (query.Count() == 1)
            {
                foreach (var i in query)
                {
                    return i;
                }
            }
            return null;
        }

        public Boolean INSERT_QUIZ(List<BODY_DATA> data, string permission, string Q_NAME)
        {
            var client = connet();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var test = database.GetCollection<LIST_INSERT>(Q_NAME);
                foreach (var i in data)
                {
                    var data_insert = new LIST_INSERT
                    {
                        INSERT_BODY = i.text,
                        permissions = permission,
                        QUIZ_NAME = Q_NAME
                    };
                    var insertResult = test.InsertOneAsync(data_insert);
                }
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