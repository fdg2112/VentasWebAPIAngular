namespace WSVentas.Models.Response
{
    public class Respuesta
    {
        public bool Exito { get; set; }
        public string Mensaje { get; set; }
        public object Datos { get; set; }

        public Respuesta()
        {
            Exito = false;
        }
    }
}
