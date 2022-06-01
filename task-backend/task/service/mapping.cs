using MongoDB.Driver;
using task.perset;
using task.quiz;
using task.user;

namespace task.mapping
{
    public class SERVICE_MAP
    {
        private PATH CONNECT_PATH = new PATH();
        private MongoClient connet()
        {
            var settings = CONNECT_PATH.CONNECTPATH;
            var client = new MongoClient(settings);
            return client;
        }
        public Boolean INSERT_PERMISS(string MY_PERRMISS, List<TEST> HENCHMAN, List<TEST> BOSS)
        {
            var client = connet();
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
            var client = connet();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<FETCH_PERMISS>("PERMISSION");
                var filter = Builders<FETCH_PERMISS>.Filter.Eq(s => s.main, MY_PERRMISS);
                var update = Builders<FETCH_PERMISS>.Update.Set("HENCHMAN", HENCHMAN);
                var query = data.UpdateOne(filter,update);
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
            var client = connet();
            try
            {
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<FETCH_PERMISS>("PERMISSION");
                var filter = Builders<FETCH_PERMISS>.Filter.Eq(s => s.main, MY_PERRMISS);
                var update = Builders<FETCH_PERMISS>.Update.Set("BOSS", BOSS);
                var query = data.UpdateOne(filter,update);
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