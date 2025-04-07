using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSVentas.Data;
using WSVentas.Models.Response;
using WSVentas.Models.Request;
using WSVentas.Models;

namespace WSVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly VentasDbContext _context;

        public ClienteController(VentasDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            Respuesta respuesta = new Respuesta();
            try
            {
                var clientes = _context.Clientes.ToList();
                respuesta.Exito = true;
                respuesta.Mensaje = "Se encontraron clientes.";
                respuesta.Datos = clientes;
                return Ok(respuesta);
            }
            catch (Exception ex)
            {
                respuesta.Exito = false;
                respuesta.Mensaje = "No se encontraron clientes. Detalle: " + ex.Message;
                return NotFound(respuesta);
            }
        }

        [HttpPost]
        public IActionResult Add(ClienteRequest clienteRequest)
        {
            Respuesta respuesta = new Respuesta();
            try
            {
                Cliente cliente = new Cliente();
                cliente.Nombre = clienteRequest.Nombre;
                _context.Clientes.Add(cliente);
                _context.SaveChanges();
                respuesta.Exito = true;
                respuesta.Mensaje = "Insersión exitosa";
                return Ok(respuesta);
            }
            catch (Exception ex)
            {
                respuesta.Exito = false;
                respuesta.Mensaje = "No se pudo agregar el cliente. Detalle: " + ex.Message;
                return NotFound(respuesta);
            }
        }
    }
}
