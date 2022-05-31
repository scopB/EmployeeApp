using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using task.quiz;

namespace task.user
{
    public record USER_OF_FETCH
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; }
        [BsonElement("username")]
        public string USERNAME { get; set; } = string.Empty;
        [BsonElement("password")]
        public string PASSWORD { get; set; } = string.Empty;
        [BsonElement("permission")]
        public string PERMISSION {get; set;} = string.Empty;
    }
    public record USER_OF_SENT
    {
        public string USERNAME { get; set; } = string.Empty;
        public string PASSWORD { get; set; } = string.Empty;
    }
    public record MAPPING_PERMISSION{
        public List<TEST>? PerForOne { get; set;}
    }
        
    public record PATH{
        public string CONNECTPATH {get; init;} = "mongodb+srv://admin:1234@emapp.2oey0.mongodb.net/?retryWrites=true&w=majority";
    }
}
