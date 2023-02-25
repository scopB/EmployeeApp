using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace task.quiz
{

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
        [BsonElement("doc_year")]
        public string doc_year {get;set;} = string.Empty;
        [BsonElement("doc_code")]
        public string doc_id {get;set;} = string.Empty;
        [BsonElement("doc_yeartime")]
        public int doc_yeartime {get;set;}
        
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

    public record UPDATE_DOC
    {
        public string doc_code {get;set;} = string.Empty;
        public string year {get;set;} = string.Empty;
        public List<QUIZ_MAINTOPIC>? doc_maintopic {get;set;}
    }

    public record CREATE_ASSESSMENT_FORM
    {
        [BsonElement("_id")]
        public ObjectId _id {get;set;}
        [BsonElement("am_year")]
        public string am_year {get;set;} = string.Empty;
        [BsonElement("am_number_of_kpi")]
        public string am_number_of_kpi {get;set;} = string.Empty;
        [BsonElement("am_createby")]

        public int am_createby {get;set;}
        [BsonElement("am_createdate")]

        public long am_createdate {get;set;}
        [BsonElement("am_enddate")]
        public long am_enddate {get;set;}
    }

    public record CHECK_STATUS
    {
        public string doc_id{get;set;} = string.Empty;
        public int for_user{get;set;}
        public string doc_year {get;set;} = string.Empty;
        public string status{get;set;} = string.Empty;
    }

    public record CHECK_STATUS_INPUT
    {
        public int id {get;set;}
        public List<string>? year {get;set;}
    }

    public record SUBMIT_SCORE
    {
        [BsonElement("_id")]
        public ObjectId _id {get;set;}
        [BsonElement("doc_year")]
        public string doc_year {get;set;} = string.Empty;
        [BsonElement("doc_code")]
        public string doc_id {get;set;} = string.Empty;
        [BsonElement("doc_yeartime")]
        public int doc_yeartime {get;set;}
        
        [BsonElement("doc_createby")]

        public int doc_createbyid {get;set;}
        [BsonElement("doc_foruser")]

        public int doc_foruserid {get;set;}
        [BsonElement("mode")]
        public int doc_mode_id {get;set;}
        [BsonElement("doc_score")]
        public int doc_score {get;set;}
        [BsonElement("topics")]
        public List<QUIZ_MAINTOPIC_SCOER>? maintopics {get;set;}
    }

    public record QUIZ_SUPDETAIL_SCORE
    {
        [BsonElement("sd_name")]
        public string sd_name {get;set;} = string.Empty;
        [BsonElement("sd_choice")]
        public string sd_choice {get;set;} = string.Empty; 
        [BsonElement("weight")]
        public int weight {get;set;}
        [BsonElement("score")]
        public int score {get;set;}
    }
     public record QUIZ_SUPTOPIC_SCORE
    {
        [BsonElement("st_name")]
        public string st_name {get;set;} = string.Empty;
        [BsonElement("st_weight")]
        public int st_weight {get;set;}
        [BsonElement("st_score")]
        public int st_score {get;set;}
        [BsonElement("st_supdetail")]
        public List<QUIZ_SUPDETAIL_SCORE>? st_supdetail {get;set;}
    }
    public record QUIZ_MAINTOPIC_SCOER
    {
        [BsonElement("mt_name")]
        public string mt_name {get;set;} = string.Empty;
        [BsonElement("mt_weight")]
        public int mt_weight {get;set;}
        [BsonElement("mt_score")]
        public int mt_score {get;set;}
        [BsonElement("mt_suptopic")]
        public List<QUIZ_SUPTOPIC_SCORE>? mt_suptopic {get;set;}

    }

}