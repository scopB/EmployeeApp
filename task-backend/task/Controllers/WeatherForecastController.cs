using Microsoft.AspNetCore.Mvc;
using task.mainservice;

namespace task.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class dataController : ControllerBase
    {
        private readonly service repository;
        public dataController()
        {
            repository = new service();
        }

        [HttpGet]
        public Boolean test(){
            var ans = repository.PUSH_QUIZ();
            return ans;
        }
    }

}

