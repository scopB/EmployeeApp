using Microsoft.AspNetCore.Mvc;
using ore.structure;
using task.login;
using task.mainservice;
using task.mapping;
using task.perset;
using task.quiz;
using task.score;
using task.sendback;
using task.token;
using task.token_model;
using task.user;
using task.ore_mangement;

namespace task.Controllers
{
    [ApiController]
    [Route("api")]
    public class dataController : ControllerBase
    {
        private readonly service repository;
        private readonly LOGIN_MANAGE LOGIN_C;
        private readonly SERVICE_MAP MAPPING;
        private readonly token_program token_repository;
        private readonly ore_mangement_ ore_repository;
        public dataController()
        {
            repository = new service();
            LOGIN_C = new LOGIN_MANAGE();
            MAPPING = new SERVICE_MAP();
            token_repository = new token_program();
            ore_repository = new ore_mangement_();
        }

        [HttpPost("showquiz")]
        public ActionResult<List<LIST_INSERT2>> SHOW_DATA(FOR_SHOW_DATA in_data)
        {
            var data = repository.SHOW_QUIZ(in_data.permission, in_data.username);
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

        [HttpPost("logintest")]//test for token in localstorage ENCODE+DECODE
        public ActionResult<TOKEN_BODY> Login_token(USER_OF_SENT data)
        {
            var result = LOGIN_C.LOGIN_CHECK(data);
            
            // Console.WriteLine(result);
            if (result.result == true)
            {
                var ans = token_repository.generateJwtToken(data.USERNAME, result.permission, "true");
                var test = token_repository.DECODE_JWT_USERNAME(ans);
                Console.WriteLine(test.ToString());
                return Ok(ans);
            }
            return BadRequest();
        }
        [HttpPost("register")]
        public ActionResult<Boolean> register(USER_OF_REG data)
        {
            var result = LOGIN_C.register(data);
            // Console.WriteLine(result);
            if (result == true)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpGet("show_permission")]
        public ActionResult<List<SHOW_PERRMISS>> GET_PER()
        {
            var result = MAPPING.GET_PERMISSION();
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpPost("insert_per")]
        public ActionResult<Boolean> insert_permiss(GET_PERMISS data)
        {
            var result = MAPPING.INSERT_PERMISS(data.main, data.HENCHMAN, data.BOSS);
            if (result == false)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("insert_update_H")]
        public ActionResult<Boolean> update_permissH(GET_PERMISS data)
        {
            var result = MAPPING.UPDATE_PERMISS_H(data.main, data.HENCHMAN);
            if (result == false)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("insert_update_B")]
        public ActionResult<Boolean> update_permissB(GET_PERMISS data)
        {
            var result = MAPPING.UPDATE_PERMISS_B(data.main, data.BOSS);
            if (result == false)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("submit_quiz")]
        public ActionResult<Boolean> submit_score(GET_SCORE data)
        {
            var result = repository.SEND_SCORE(data.username, data.Q_NAME, data.RESULT);
            if (result == false)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("search_score")]
        public ActionResult<List<INSERT_SCORE>> search(SEARCH_SCORE get_data_)
        {
            var result = repository.SHOW_SCORE(get_data_.quiz_name, get_data_.username);
            if (result != null)
            {
                return Ok(result);
            }
            return new StatusCodeResult(400);
        }

        [HttpPost("insert_user")]
        public ActionResult<Boolean> insert_user(USER_STR user)
        {
            var result = LOGIN_C.NEW_REGISTER(user);
            return Ok(result);
        }

        [HttpPost("insert_ore")]
        public ActionResult<Boolean> insert_ore(ORE_STR data)
        {
            var result = ore_repository.INSERT_ORE_STR(data);
            return result;
        }
    }

}

