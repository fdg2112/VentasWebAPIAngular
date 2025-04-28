using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSVentas.Models.Request;
using WSVentas.Models.Response;
using WSVentas.Services;

namespace WSVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Autentificar([FromBody] AuthRequest model)
        {
            Console.WriteLine("Hasta aca llego");
            Response response = new Response();

            var userResponse = _userService.Auth(model);
            if (userResponse == null)
            {
                response.Exito = false;
                response.Mensaje = "Usuario o contraseña incorrectos";
                return BadRequest(response);
            }
            response.Exito = true;
            response.Datos = userResponse;
            return Ok(response);
        }
    }
}
