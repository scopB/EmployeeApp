using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace task.score
{
    public record INSERT_SCORE
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        [BsonElement("USERNAME")]
        public string username {get; set;} = string.Empty;
        [BsonElement("QUIZ_NAME")]
        public string Q_NAME{get; set;}=string.Empty;
    }
    
}