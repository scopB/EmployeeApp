using Microsoft.AspNetCore.Mvc;
using task.login;
using task.mainservice;
using task.mapping;
using task.perset;
using task.quiz;
using task.score;
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
        private readonly SERVICE_MAP MAPPING; 
        public dataController()
        {
            repository = new service();
            LOGIN_C = new LOGIN_MANAGE();
            MAPPING = new SERVICE_MAP();
        }

        [HttpPost("showquiz")]
        public ActionResult<List<LIST_INSERT2>> SHOW_DATA(FOR_SHOW_DATA in_data){
            var data = repository.SHOW_QUIZ(in_data.permission,in_data.username);
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

        [HttpPost("insert_per")]
        public ActionResult<Boolean> insert_permiss(GET_PERMISS data)
        {
            var result = MAPPING.INSERT_PERMISS(data.main,data.HENCHMAN,data.BOSS);
            if(result == false)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("insert_update_H")]
        public ActionResult<Boolean> update_permissH(GET_PERMISS data)
        {
            var result = MAPPING.UPDATE_PERMISS_H(data.main,data.HENCHMAN);
            if(result == false)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("insert_update_B")]
        public ActionResult<Boolean> update_permissB(GET_PERMISS data)
        {
            var result = MAPPING.UPDATE_PERMISS_B(data.main,data.BOSS);
            if(result == false)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("submit_quiz")]
        public ActionResult<Boolean> submit_score(GET_SCORE data)
        {
            var result = repository.SEND_SCORE(data.username,data.Q_NAME,data.RESULT);
            if(result == false)
            {
                return BadRequest();
            }
            return Ok(result);
        }
    }

}

