using Microsoft.AspNetCore.Mvc;
using task.mainservice;
using task.quiz;

namespace task.Controllers
{
    [ApiController]
    [Route("[api]")]
    public class dataController : ControllerBase
    {
        private readonly service repository;
        public dataController()
        {
            repository = new service();
        }

        [HttpGet("getquiz")]
        public ActionResult<List<model_quiz>> test(){
            var data = repository.GET_QUIZ();
            if (data == null || !data.Any())
            {
                return NotFound();
            }
            return Ok(data);
        }

        
    }

}

