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
            var per = "";
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<USER_STR_MONGO>("PS");
                var query = data.Find(s => s.ps_username == user_data.USERNAME && s.ps_password == user_data.PASSWORD).ToList();
                foreach (var i in query)
                {
                    // Console.WriteLine(i.PERMISSION);
                    if (i != null)
                    {
                        a = true;
                        per = i.ps_position;
                    }
                    var resultdata = new LOGIN
                    {
                        result = a,
                        permission = per,
                        user_code = i.ps_id
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
                    ps_username = user.ps_username,
                    ps_lastlogin = user.st_lastlogin
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

        public List<USER_STR_MONGO> FIND_HENCHMAN(int user_code)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<USER_STR_MONGO>("PS");
                var result_ = new List<USER_STR_MONGO>(); 
                var filter = Builders<USER_STR_MONGO>.Filter.Eq(s => s.ps_bossid, user_code);
                var result = data.Find(filter).ToList();
                foreach(var i in result)
                {
                    result_.Add(i);
                }
                return result_;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public List<USER_STR_MONGO> SHOW_USER()
        {
            try
            {
                var client = connect();
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<USER_STR_MONGO>("PS");
                var result = new List<USER_STR_MONGO>();
                var list = data.Find(_ => true).ToList();
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

        public USER_STR_MONGO FIND_USER(int user_id)
        {
            try
            {
                var output = new USER_STR_MONGO();
                var client = connect();
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<USER_STR_MONGO>("PS");
                var filter = Builders<USER_STR_MONGO>.Filter.Eq(s => s.ps_id,user_id);
                var result = data.Find(filter).ToList();
                foreach(var i in result)
                {
                    output = i;
                }
                return output;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public Boolean UPDATE_USER(USER_STR_MONGO data_new)
        {
            try
            {
                var client = connect();
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<USER_STR_MONGO>("ORE");
                var filter = Builders<USER_STR_MONGO>.Filter.Eq(i => i.ps_id , data_new.ps_id);
                var update_ = Builders<USER_STR_MONGO>.Update.Set(i => i.ps_bossid,data_new.ps_bossid).
                Set(i => i.ps_lastname , data_new.ps_lastname).Set(i => i.ps_name , data_new.ps_name).
                Set(i => i.ps_position , data_new.ps_position);
                var list = data.UpdateOne(filter,update_);
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