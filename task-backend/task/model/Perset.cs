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

    public record SHOW_DOC_INPUT
    {
        public int user_code {get;set;}
        public string year {get;set;} = string.Empty;
    }

    public record UPDATE_ST_DOC_INPUT
    {
        public string doc_id {get;set;} = string.Empty;
        public string year {get;set;} = string.Empty;
        public string status_update {get;set;} = string.Empty;
    }

    public record UPDATE_LS_DOC_INPUT
    {
        public string doc_id {get;set;} = string.Empty;
        public string year {get;set;} = string.Empty;
        public long last_see {get;set;} 
    }
    public record FIND_HM_INPUT
    {
        public int user_code {get;set;}
    }

}