using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace task.quiz
{
    public record LIST_INSERT
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        [BsonElement("QUIZ")]
        public string INSERT_BODY {get; set;} = string.Empty;
        [BsonElement("permissions")] 
        public string permissions {get; set;} = string.Empty;
        [BsonElement("QUIZ_NAME")] 
        public string QUIZ_NAME {get; set;} = string.Empty;
    }
    public record POST_INSERT{
        public List<string>? body{get; set;}
        public string permissions {get; set;} = string.Empty;
        public string QUIZ_NAME {get; set;} = string.Empty;

    }

}