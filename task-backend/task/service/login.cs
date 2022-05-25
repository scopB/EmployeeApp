using MongoDB.Bson;
using MongoDB.Driver;
using task.quiz;
using task.sendback;
using task.user;

namespace task.login
{
    public class LOGIN_MANAGE
    {
        private MongoClient connet()
        {
            var settings = "mongodb+srv://admin:1234@emapp.2oey0.mongodb.net/?retryWrites=true&w=majority";
            var client = new MongoClient(settings);
            return client;
        }

        public LOGIN LOGIN_CHECK(USER_OF_SENT user_data)
        {
            var client = connet();
            var a = false;
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
                var resultdata = new LOGIN{
                    result = a,
                    permission = i.PERMISSION
                };
                // Console.WriteLine(resultdata);
                return resultdata;
            }
            return null;
        }

    }
}