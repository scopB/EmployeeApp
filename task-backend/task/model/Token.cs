namespace task.token_model
{
    public record DECODE_FORM{
        public string username {get;set;} = string.Empty;
        public string permission {get;set;} = string.Empty;
        public string status {get;set;} = string.Empty;
    }

    public record TOKEN_BODY
    {
        public string token {get;set;} = string.Empty;
    }

}