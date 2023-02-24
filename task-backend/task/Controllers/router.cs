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

        [HttpPost("insert_doc")]
        public ActionResult<Boolean> insert_doc(DOC_FORM data)
        {
            var result = repository.INSERT_DOC(data,data.doc_year);
            return result;
        }

        [HttpPost("show_doc")]
        public ActionResult<List<DOC_FORM>> show_document(SHOW_DOC_INPUT data)
        {
            var result = repository.SHOW_DOC_FOR_USER(data.user_code,data.year);
            return result;
        }

        [HttpPost("update_status_doc")]
        public ActionResult<Boolean> update_kpistatus(UPDATE_ST_DOC_INPUT data)
        {
            var result = repository.UPDATE_STATUS_DOC(data.doc_id,data.status_update,data.year);
            return result;
        }

        [HttpPost("update_lastsee_doc")]
        public ActionResult<Boolean> update_last_see(UPDATE_LS_DOC_INPUT data)
        {
            var result = repository.UPDATE_LASTSEE_DOC(data.doc_id,data.last_see,data.year);
            return result;
        }

        [HttpPost("find_henchman")]
        public ActionResult<List<USER_STR_MONGO>> find_henchman(FIND_HM_INPUT data)
        {
            var result = LOGIN_C.FIND_HENCHMAN(data.user_code);
            return result;
        }
        [HttpPost("create_assessment")]
        public ActionResult<Boolean> create_ass(CREATE_ASSESSMENT_FORM data)
        {
            var result = repository.CREATE_ASSESSMENT(data);
            return result;
        }
        [HttpGet("show_assessment")]
        public ActionResult<List<CREATE_ASSESSMENT_FORM>> show_ass()
        {
            var result = repository.SHOW_ASSESSMENT();
            return result;
        } 
        [HttpGet("get_all_ore")]
        public ActionResult<List<ORE_STR_MONGO_GET>> show_ore_all()
        {
            var result = ore_repository.SHOW_ORE();
            return result;
        }       
        [HttpPost("update_ore")]
        public ActionResult<Boolean> update_ore(ORE_STR_MONGO data)
        {
            var result = ore_repository.UPDATE_ORE(data);
            return result;
        }

        [HttpGet("get_all_user")]
        public ActionResult<List<USER_STR_MONGO>> show_user_all()
        {
            var result = LOGIN_C.SHOW_USER();
            return result;
        }       
        [HttpPost("update_user")]
        public ActionResult<Boolean> update_ore(USER_STR_MONGO data)
        {
            var result = LOGIN_C.UPDATE_USER(data);
            return result;
        }
        [HttpPost("get_doc_from")]
        public ActionResult<List<CHECK_STATUS>> find_doc(CHECK_STATUS_INPUT data)
        {
            var result = repository.CHECK_KPI_STATUS(data.id,data.year);
            return result;
        }
        [HttpPost("update_doc")]
        public ActionResult<Boolean> update_doc(UPDATE_DOC data)
        {
            var result = repository.UPDATE_DOC(data);
            return result;
        }
    }

}

