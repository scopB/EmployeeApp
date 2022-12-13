using MongoDB.Bson;
using MongoDB.Driver;
using ore.structure;
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

        public Boolean NEW_REGISTER(USER_STR user)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<USER_STR_MONGO>("PS");
                var newUser = new USER_STR_MONGO{
                    ps_birthday = user.ps_birthday,
                    ps_bossid = user.ps_bossid,
                    ps_cizid = user.ps_cizid,
                    ps_id = user.ps_id,
                    ps_lastname = user.ps_lastname,
                    ps_name = user.ps_name,
                    ps_org_id = user.ps_org_id,
                    ps_password = user.ps_password,
                    ps_position = user.ps_position,
                    ps_username = user.ps_username
                };
                var dataresult = data.InsertOneAsync(newUser);
                Console.WriteLine(dataresult);
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