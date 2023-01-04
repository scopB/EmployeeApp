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
                var data_for_insert = new ORE_STR_MONGO{
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
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
    }

}