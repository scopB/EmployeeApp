namespace task.sendback{
    public record LOGIN{
        public Boolean result {get; set;}
        public string permission {get;set;} = string.Empty;
    }
}