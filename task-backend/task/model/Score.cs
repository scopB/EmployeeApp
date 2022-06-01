using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace task.score
{
    public record INSERT_SCORE
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        [BsonElement("QUIZ_NAME")]
        public string Q_NAME{get; set;}=string.Empty;
        [BsonElement("RESULT")]
        public List<SCORE_BODY>? RESULT {get; set;}
    }
    public record GET_SCORE
    {
        public string username {get; set;} = string.Empty;
        public string Q_NAME{get; set;}=string.Empty;
        public List<SCORE_BODY>? RESULT {get; set;}
    }
    public record SCORE_BODY
    {
        public Int32 score {get; set;}
    }
}