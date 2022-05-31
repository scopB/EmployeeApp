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

    public record FORM_DATA{
        public HEADER_DATA? BUILD {get; set;}
        public List<BODY_DATA>? QUIZ_DETAIL{get; set;}
    }
    public record HEADER_DATA{
        public string name{get; set;} = string.Empty;
        public string permission{get; set;} = string.Empty;
    }
    public record BODY_DATA{
        public Int32 id{get; set;}
        public string text{get; set;}=string.Empty;
    }
    public record LOGIN_DATA{
        public Int32 result{get; set;}
        public string permission{get; set;}=string.Empty;
    }

    public record LIST_INSERT_TEST
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        [BsonElement("permissions")] 
        public List<TEST>? permissions {get; set;}
    }

    public record TEST2
    {
        public List<TEST>? permissions {get; set;}
    }

    public record TEST
    {
        public string odata {get; set;} = string.Empty;
    }

    public record FOR_SHOW_DATA
    {
        public string permission{get; set;}=string.Empty;
    }

}