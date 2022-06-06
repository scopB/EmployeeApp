using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace task.quiz
{
    public record LIST_INSERT2
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        [BsonElement("QUIZ")]
        public List<BODY_DATA>? INSERT_BODY {get; set;} 
        [BsonElement("permissions")] 
        public List<TEST>? permissions {get; set;}
        [BsonElement("QUIZ_NAME")] 
        public string QUIZ_NAME {get; set;} = string.Empty;
    }

    public record FORM_DATA{
        public HEADER_DATA? BUILD {get; set;}
        public List<BODY_DATA>? QUIZ_DETAIL{get; set;}
    }
    public record HEADER_DATA{
        public string name{get; set;} = string.Empty;
        public List<TEST>? permission{get; set;} 
    }
    public record BODY_DATA{
        public Int32 id{get; set;}
        public string text{get; set;}=string.Empty;
    }

    public record TEST
    {
        public string permission {get; set;} = string.Empty;
    }

    public record FOR_SHOW_DATA
    {
        public string username {get; set;} = string.Empty;
        public string permission{get; set;}=string.Empty;
    }

}