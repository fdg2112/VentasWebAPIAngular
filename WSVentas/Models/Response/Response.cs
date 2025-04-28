namespace WSVentas.Models.Response
{
    public class Response
    {
        public bool Exito { get; set; }
        public string Mensaje { get; set; }
        public object Datos { get; set; }

        public Response()
        {
            Exito = false;
        }
    }
}
