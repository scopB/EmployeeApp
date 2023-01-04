using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ore.structure
{
    public record ORE_STR
    {
        public int ore_id {get;set;}
        public int ore_supervisor {get;set;}
        public string ore_shortname {get;set;} = string.Empty;
        public string ore_longname {get;set;} = string.Empty;
        public string ore_level {get;set;} = string.Empty;
        public string ore_path {get;set;} = string.Empty;
        public long create_date {get;set;}
        public int ore_createby {get;set;}
    }

    public record USER_STR
    {
        public int ps_id {get;set;}
        public int ps_org_id {get;set;}
        public string ps_name {get;set;} = string.Empty;
        public long st_lastlogin {get;set;}
        public string ps_lastname {get;set;} = string.Empty;
        public string ps_username {get;set;} = string.Empty;
        public string ps_password {get;set;} = string.Empty;
        public long ps_birthday {get;set;} 
        public string ps_cizid {get;set;} = string.Empty;
        public int ps_bossid {get;set;} 
        public string ps_position {get;set;} = string.Empty;
    }

    public record USER_STATUS
    {
        public int st_userid {get;set;}
        public long st_lastlogin {get;set;}
        public long st_createdate {get;set;}
        public long st_createkpi {get;set;}
        public long st_lastsee {get;set;}
        public string st_statuskpi {get;set;} = string.Empty;
    }

    public record USER_STR_MONGO
    {
        [BsonElement("_id")]
        public ObjectId _id {get;set;}
        [BsonElement("ps_code")]
        public int ps_id {get;set;}
        [BsonElement("ps_org_code")]
        public int ps_org_id {get;set;}
        [BsonElement("ps_name")]
        public string ps_name {get;set;} = string.Empty;
        [BsonElement("ps_lastname")]
        public string ps_lastname {get;set;} = string.Empty;
        [BsonElement("ps_username")]
        public string ps_username {get;set;} = string.Empty;
        [BsonElement("ps_password")]
        public string ps_password {get;set;} = string.Empty;
        [BsonElement("ps_birthday")]
        public long ps_birthday {get;set;} 
        [BsonElement("ps_cizid")]
        public string ps_cizid {get;set;} = string.Empty;
        [BsonElement("ps_bosscode")]
        public int ps_bossid {get;set;} 
        [BsonElement("ps_lastlogin")]
        public long ps_lastlogin {get;set;}
        [BsonElement("ps_position")]
        public string ps_position {get;set;} = string.Empty;
    }
    public record ORE_STR_MONGO
    {
        [BsonElement("ore_code")]
        public int ore_id {get;set;}
        [BsonElement("ore_supervisor")]
        public int ore_supervisor {get;set;}
        [BsonElement("ore_shortname")]
        public string ore_shortname {get;set;} = string.Empty;
        [BsonElement("ore_longname")]
        public string ore_longname {get;set;} = string.Empty;
        [BsonElement("ore_level")]
        public string ore_level {get;set;} = string.Empty;
        [BsonElement("ore_path")]
        public string ore_path {get;set;} = string.Empty;
        [BsonElement("create_date")]
        public long create_date {get;set;}
        [BsonElement("ore_createby")]
        public int ore_createby {get;set;}
    }
}