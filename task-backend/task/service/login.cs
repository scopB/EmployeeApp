using MongoDB.Bson;
using MongoDB.Driver;
using task.quiz;
using task.sendback;
using task.user;

namespace task.login
{
    public class LOGIN_MANAGE
    {
        private PATH CONNECT_PATH = new PATH();
        private MongoClient connect()
        {
            var settings = CONNECT_PATH.CONNECTPATH;
            var test = MongoClientSettings.FromConnectionString(CONNECT_PATH.CONNECTPATH);
            test.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(test);
            // var client = new MongoClient(settings);
            return client;
        }

        public LOGIN LOGIN_CHECK(USER_OF_SENT user_data)
        {
            var client = connect();
            var a = false;
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<USER_OF_FETCH>("USER");
                var query = data.Find(s => s.USERNAME == user_data.USERNAME && s.PASSWORD == user_data.PASSWORD).ToList();
                foreach (var i in query)
                {
                    // Console.WriteLine(i.PERMISSION);
                    if (i != null)
                    {
                        a = true;
                    }
                    var resultdata = new LOGIN
                    {
                        result = a,
                        permission = i.PERMISSION
                    };
                    // Console.WriteLine(resultdata);
                    return resultdata;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return null;
        }

        public Boolean register(USER_OF_REG user){
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<USER_OF_FETCH>("USER");
                var newUser = new USER_OF_FETCH{
                    Id = ObjectId.GenerateNewId(),
                    USERNAME = user.USERNAME,
                    PASSWORD = user.PASSWORD,
                    PERMISSION = user.PERMISSION
                };
                var dataresult = data.InsertOneAsync(newUser);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return false;
        }

    }
}