using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

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
    public record HOME_USER_CHECK{
        public string username { get; set;} = string.Empty;
    }
        
}
