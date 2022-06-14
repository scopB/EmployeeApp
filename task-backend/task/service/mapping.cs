using MongoDB.Driver;
using task.perset;
using task.quiz;
using task.user;

namespace task.mapping
{
    public class SERVICE_MAP
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

        public List<SHOW_PERRMISS> GET_PERMISSION()
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<FETCH_PERMISS>("PERMISSION");
                var result = new List<SHOW_PERRMISS>();
                var value = data.Find(_ => true).ToList();
                foreach (var i in value)
                {
                    var temp = new SHOW_PERRMISS
                    {
                        permission = i.main
                    };
                    if(!result.Contains(temp))
                    {
                        result.Add(temp);
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return null;
        }

        public Boolean INSERT_PERMISS(string MY_PERRMISS, List<TEST> HENCHMAN, List<TEST> BOSS)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<FETCH_PERMISS>("PERMISSION");
                var data_insert = new FETCH_PERMISS
                {
                    main = MY_PERRMISS,
                    HENCHMAN = HENCHMAN,
                    BOSS = BOSS
                };
                var insertResult = data.InsertOneAsync(data_insert);
                // Console.WriteLine(insertResult);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return false;
        }

        public Boolean UPDATE_PERMISS_H(string MY_PERRMISS, List<TEST> HENCHMAN)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<FETCH_PERMISS>("PERMISSION");
                var filter = Builders<FETCH_PERMISS>.Filter.Eq(s => s.main, MY_PERRMISS);
                var update = Builders<FETCH_PERMISS>.Update.Set("HENCHMAN", HENCHMAN);
                var query = data.UpdateOne(filter, update);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return false;
        }
        public Boolean UPDATE_PERMISS_B(string MY_PERRMISS, List<TEST> BOSS)
        {
            var client = connect();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<FETCH_PERMISS>("PERMISSION");
                var filter = Builders<FETCH_PERMISS>.Filter.Eq(s => s.main, MY_PERRMISS);
                var update = Builders<FETCH_PERMISS>.Update.Set("BOSS", BOSS);
                var query = data.UpdateOne(filter, update);

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