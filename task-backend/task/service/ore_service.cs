using MongoDB.Bson;
using MongoDB.Driver;
using ore.structure;
using task.quiz;
using task.score;
using task.user;

namespace task.ore_mangement
{
    public class ore_mangement_
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

        public Boolean INSERT_ORE_STR(ORE_STR ore_data)
        {
            try
            {
                var client = connect();
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<ORE_STR_MONGO>("ORE");
                var data_for_insert = new ORE_STR_MONGO
                {
                    ore_createby = ore_data.ore_createby,
                    ore_id = ore_data.ore_id,
                    ore_level = ore_data.ore_level,
                    ore_longname = ore_data.ore_level,
                    ore_path = ore_data.ore_path,
                    ore_shortname = ore_data.ore_shortname,
                    ore_supervisor = ore_data.ore_supervisor
                };
                var result = data.InsertOneAsync(data_for_insert);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public List<ORE_STR_MONGO_GET> SHOW_ORE()
        {
            try
            {
                var client = connect();
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<ORE_STR_MONGO_GET>("ORE");
                var result = new List<ORE_STR_MONGO_GET>();
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

        public Boolean UPDATE_ORE(ORE_STR_MONGO data_new)
        {
            try
            {
                var client = connect();
                var database = client.GetDatabase("EMAPP");
                var data = database.GetCollection<ORE_STR_MONGO>("ORE");
                var filter = Builders<ORE_STR_MONGO>.Filter.Eq(i => i.ore_id , data_new.ore_id);
                var update_ = Builders<ORE_STR_MONGO>.Update.Set(i => i.ore_level,data_new.ore_level).
                Set(i => i.ore_supervisor , data_new.ore_supervisor).Set(i => i.ore_longname , data_new.ore_longname).
                Set(i => i.ore_path , data_new.ore_path).Set(i => i.ore_shortname , data_new.ore_shortname);
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