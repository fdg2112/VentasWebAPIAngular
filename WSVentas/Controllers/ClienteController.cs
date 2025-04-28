using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSVentas.Data;
using WSVentas.Models.Response;
using WSVentas.Models.Request;
using WSVentas.Models;
using Microsoft.AspNetCore.Authorization;

namespace WSVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            Response respuesta = new Response();
            try
            {
                var clientes = _context.Clientes.OrderByDescending(c => c.Id).ToList();
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
            Response respuesta = new Response();
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

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ClienteRequest clienteRequest)
        {
            var respuesta = new Response();
            try
            {
                var cliente = _context.Clientes.Find(id);
                if (cliente == null)
                {
                    respuesta.Exito = false;
                    respuesta.Mensaje = "Cliente no encontrado.";
                    return NotFound(respuesta);
                }

                cliente.Nombre = clienteRequest.Nombre;
                _context.Clientes.Update(cliente);
                _context.SaveChanges();

                respuesta.Exito = true;
                respuesta.Mensaje = "Actualización exitosa";
                return Ok(respuesta);
            }
            catch (Exception ex)
            {
                respuesta.Exito = false;
                respuesta.Mensaje = "No se pudo actualizar el cliente. Detalle: " + ex.Message;
                return NotFound(respuesta);
            }
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Response respuesta = new Response();
            try
            {
                var cliente = _context.Clientes.Find(id);
                if (cliente == null)
                {
                    respuesta.Exito = false;
                    respuesta.Mensaje = "Cliente no encontrado.";
                    return NotFound(respuesta);
                }
                _context.Clientes.Remove(cliente);
                _context.SaveChanges();
                respuesta.Exito = true;
                respuesta.Mensaje = "Eliminación exitosa";
                return Ok(respuesta);
            }
            catch (Exception ex)
            {
                respuesta.Exito = false;
                respuesta.Mensaje = "No se pudo eliminar el cliente. Detalle: " + ex.Message;
                return NotFound(respuesta);
            }
        }
    }
}
