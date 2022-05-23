using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace task.quiz
{
    public record model_quiz
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        [BsonElement("quiz")]
        public string quizname { get; set; } = string.Empty;
    }
}