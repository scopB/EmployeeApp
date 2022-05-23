using Microsoft.AspNetCore.Mvc;
using task.mainservice;
using task.quiz;

namespace task.Controllers
{
    [ApiController]
    [Route("api")]
    public class dataController : ControllerBase
    {
        private readonly service repository;
        public dataController()
        {
            repository = new service();
        }

        [HttpGet("getquiz")]
        public ActionResult<List<List<LIST_INSERT>>> test(){
            var data = repository.GET_QUIZ();
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        [HttpPost("insert_quiz")]
        public ActionResult<Boolean> Insert(POST_INSERT data)
        {
            var result = repository.INSERT_QUIZ(data.body,data.permissions,data.QUIZ_NAME);
            if (result == true)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        
    }

}

