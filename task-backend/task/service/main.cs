using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using Newtonsoft.Json;

namespace task.mainservice
{
    public class service
    {
        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "db8305bb26bc676348b9488bcd98003625b744c0",
            BasePath = "https://task-86437.firebaseapp.com"
        };

        public Boolean PUSH_QUIZ()
        {
            try{
                IFirebaseClient client = new FirebaseClient(config);
                FirebaseResponse response = client.Get("testfortask");
                dynamic test = JsonConvert.DeserializeObject(response.Body); 
                Console.WriteLine(test);
            }
            catch(Exception ex){
                Console.WriteLine(ex);
                Console.WriteLine("a-------------------");
                
            }
            return true;
        }

    }
}