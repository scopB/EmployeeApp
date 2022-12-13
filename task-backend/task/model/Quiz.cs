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

    public record QUIZ_SUPDETAIL
    {
        public string sd_name {get;set;} = string.Empty;
        public string sd_choice01 {get;set;} = string.Empty; 
        public string sd_choice02 {get;set;} = string.Empty; 
        public string sd_choice03 {get;set;} = string.Empty; 
        public string sd_choice04 {get;set;} = string.Empty; 
        public string sd_choice05 {get;set;} = string.Empty; 
        public int sd_point01 {get;set;} 
        public int sd_point02 {get;set;} 
        public int sd_point03 {get;set;} 
        public int sd_point04 {get;set;} 
        public int sd_point05 {get;set;} 
    }

    public record QUIZ_SUPTOPIC
    {
        public string st_name {get;set;} = string.Empty;
        public int st_weight {get;set;}
        public List<QUIZ_SUPDETAIL>? st_supdetail {get;set;}
    }

    public record QUIZ_MAINTOPIC
    {
        public string mt_name {get;set;} = string.Empty;
        public int mt_weight {get;set;}
        public List<QUIZ_SUPTOPIC>? mt_suptopic {get;set;}

    }

    public record DOC_FORM
    {
        public int doc_id {get;set;}
        public int doc_createbyid {get;set;}
        public int doc_foruserid {get;set;}
        public long doc_createdate {get;set;}
        public List<QUIZ_MAINTOPIC>? doc_maintopic {get;set;}
    }

}