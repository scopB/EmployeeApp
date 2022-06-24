using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using task.token_model;
//status(online status),username(user.username),permission(user.permission),auth(page)
namespace task.token{
    class token_program{
        public string generateJwtToken(string USERNAME, string permission,string status)
        {//Generate Token and send to login api when login
            var tokenHandler = new JwtSecurityTokenHandler();
            string SecretKEY = "nXQpLvVTYVhwSpROX68eEJqbMP5mwcKR6gEwY4noEgwxIS7GC03dMNKZTIVwQoQ";
            var key = Encoding.UTF8.GetBytes(SecretKEY);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("username", USERNAME), new Claim("permission", permission),new Claim("status",status) }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public DECODE_FORM DECODE_JWT_USERNAME(string tokenz)
        {//Get Username from TOKEN
            var jwt = tokenz;
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);
            var tokenS = token as JwtSecurityToken;
            var user_name = tokenS.Claims.First(claim => claim.Type == "username").Value;
            var user_permission = tokenS.Claims.First(claim => claim.Type == "permission").Value;
            var web_status = tokenS.Claims.First(claim => claim.Type == "status").Value;
            var ans = new DECODE_FORM
            {
                username = user_name,
                permission = user_permission,
                status = web_status
            };
            return ans;
        }

        // public Boolean CHECK_TOKEN_TIME(string time_to_check, string REAL_TOKEN)
        // {//Check token exp
        //     DateTime foo = DateTime.Now;
        //     long unixTime = ((DateTimeOffset)foo).ToUnixTimeSeconds();
        //     long check = long.Parse(time_to_check);
        //     if (check - unixTime <= 0)
        //     {
        //         return false;
        //     }
        //     return true;
        // }
    }
}