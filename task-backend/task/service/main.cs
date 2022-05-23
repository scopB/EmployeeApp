using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using MongoDB.Driver;
using Newtonsoft.Json;
using task.quiz;

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
        public List<model_quiz> GET_QUIZ()
        {
            try
            {
                var client = connet();
                var database = client.GetDatabase("EMAPP");
                var test = database.GetCollection<model_quiz>("QUIZ");
                var insertResult = test.Find(_ => true).ToList();
                return insertResult;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                List<model_quiz> bad = new List<model_quiz>();
                return bad;
            }

        }

    }
}