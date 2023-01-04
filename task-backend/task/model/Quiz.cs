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
        [BsonElement("sd_name")]
        public string sd_name {get;set;} = string.Empty;
        [BsonElement("sd_choice01")]
        public string sd_choice01 {get;set;} = string.Empty; 
        [BsonElement("sd_choice02")]
        public string sd_choice02 {get;set;} = string.Empty;
        [BsonElement("sd_choice03")] 
        public string sd_choice03 {get;set;} = string.Empty; 
        [BsonElement("sd_choice04")]
        public string sd_choice04 {get;set;} = string.Empty; 
        [BsonElement("sd_choice05")]
        public string sd_choice05 {get;set;} = string.Empty; 
        [BsonElement("weight")]
        public int weight {get;set;}
    }

    public record QUIZ_SUPTOPIC
    {
        [BsonElement("st_name")]
        public string st_name {get;set;} = string.Empty;
        [BsonElement("st_weight")]
        public int st_weight {get;set;}
        [BsonElement("st_supdetail")]
        public List<QUIZ_SUPDETAIL>? st_supdetail {get;set;}
    }

    public record QUIZ_MAINTOPIC
    {
        [BsonElement("mt_name")]
        public string mt_name {get;set;} = string.Empty;
        [BsonElement("mt_weight")]
        public int mt_weight {get;set;}
        [BsonElement("mt_suptopic")]
        public List<QUIZ_SUPTOPIC>? mt_suptopic {get;set;}

    }

    public record DOC_FORM
    {
        [BsonElement("_id")]
        public ObjectId _id {get;set;}
        [BsonElement("doc_code")]
        public int doc_id {get;set;}
        [BsonElement("doc_createby")]

        public int doc_createbyid {get;set;}
        [BsonElement("doc_foruser")]

        public int doc_foruserid {get;set;}
        [BsonElement("doc_createdate")]

        public long doc_createdate {get;set;}
        [BsonElement("st_lastsee")]

        public long st_lastsee {get;set;}
        [BsonElement("st_statuskpi")]
        public string st_statuskpi {get;set;} = string.Empty;
        [BsonElement("doc_maintopic")]

        public List<QUIZ_MAINTOPIC>? doc_maintopic {get;set;}
    }

    public record QUIZ_SUPDETAIL_
    {
        public string sd_name {get;set;} = string.Empty;
        public string sd_choice01 {get;set;} = string.Empty; 
        public string sd_choice02 {get;set;} = string.Empty; 
        public string sd_choice03 {get;set;} = string.Empty; 
        public string sd_choice04 {get;set;} = string.Empty; 
        public string sd_choice05 {get;set;} = string.Empty; 
        public int weight {get;set;}
    }

    public record QUIZ_SUPTOPIC_
    {
        public string st_name {get;set;} = string.Empty;
        public int st_weight {get;set;}
        public List<QUIZ_SUPDETAIL_>? st_supdetail {get;set;}
    }

    public record QUIZ_MAINTOPIC_
    {
        public string mt_name {get;set;} = string.Empty;
        public int mt_weight {get;set;}
        public List<QUIZ_SUPTOPIC_>? mt_suptopic {get;set;}

    }

    public record DOC_FORM_
    {
        public int doc_id {get;set;}
        public int doc_createbyid {get;set;}
        public int doc_foruserid {get;set;}
        public long doc_createdate {get;set;}
        public long st_lastsee {get;set;}
        public string st_statuskpi {get;set;} = string.Empty;
        public List<QUIZ_MAINTOPIC_>? doc_maintopic {get;set;}
    }

}