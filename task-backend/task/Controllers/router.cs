using Microsoft.AspNetCore.Mvc;
using task.login;
using task.mainservice;
using task.quiz;
using task.sendback;
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

        [HttpGet("getquiz")]//NOT USE
        public ActionResult<List<List<LIST_INSERT>>> test(){
            var data = repository.GET_QUIZ();
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        [HttpPost("showquiz")]
        public ActionResult<List<LIST_INSERT2>> SHOW_DATA(FOR_SHOW_DATA in_data){
            var data = repository.SHOW_QUIZ(in_data.permission);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        [HttpPost("insert_quiz")]
        public ActionResult<Boolean> Insert(FORM_DATA data)
        {
            var result = repository.INSERT_QUIZ(data.QUIZ_DETAIL, data.BUILD.permission, data.BUILD.name);
            if (result == true)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public ActionResult<LOGIN> Login(USER_OF_SENT data)
        {
            var result = LOGIN_C.LOGIN_CHECK(data);
            // Console.WriteLine(result);
            if (result.result == true)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpPost("finduser")]//NOT USE
        public ActionResult<USER_OF_FETCH> find(HOME_USER_CHECK data){
            var result = repository.finduser(data.username);
            if(result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }

        // [HttpPost("test")]//NOT USE
        // public ActionResult<List<LIST_INSERT_TEST>> test(TEST2 data)
        // {
        //     var result = repository.TEST_FUNC(data);
        //     if(result != null)
        //     {
        //         return Ok(result);
        //     }
        //     return NotFound();
        // }
        // [HttpGet("test")]//NOT USE
        // public ActionResult<List<LIST_INSERT_TEST>> test2()
        // {
        //     var result = repository.TEST_GET();
        //     if(result != null)
        //     {
        //         return Ok(result);
        //     }
        //     return NotFound();
        // }

    }

}

