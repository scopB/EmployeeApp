using Microsoft.AspNetCore.Mvc;
using task.login;
using task.mainservice;
using task.quiz;
using task.user;

namespace task.Controllers
{
    [ApiController]
    [Route("api")]
    public class dataController : ControllerBase
    {
        private readonly service repository;
        private readonly LOGIN_MANAGE LOGIN_C;
        public dataController()
        {
            repository = new service();
            LOGIN_C = new LOGIN_MANAGE();
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

        [HttpPost("login")]
        public ActionResult<Boolean> Login(USER_OF_SENT data)
        {
            var result = LOGIN_C.LOGIN_CHECK(data);
            if (result == true)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        
    }

}

