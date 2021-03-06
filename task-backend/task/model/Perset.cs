using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using task.quiz;

namespace task.perset
{   
    public record FETCH_PERMISS //set and get fetch data
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        [BsonElement("main")]
        public string main{get; set;} = string.Empty;
        [BsonElement("henchman")]
        public List<TEST>? HENCHMAN {get; set;} 
        [BsonElement("boss")]
        public List<TEST>? BOSS {get; set;} 
    }

    public record GET_PERMISS
    {
        public string main{get; set;} = string.Empty;
        public List<TEST>? HENCHMAN {get; set;} 
        public List<TEST>? BOSS {get; set;} 
    }

    public record SHOW_PERRMISS{
        public string permission {get; set;} = string.Empty;
    }
}