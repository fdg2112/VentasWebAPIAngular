using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WSVentas.Data;
using WSVentas.Models;
using WSVentas.Models.Common;
using WSVentas.Models.Request;
using WSVentas.Models.Response;

namespace WSVentas.Services
{
    public class UserService : IUserService
    {
        private readonly VentasDbContext _context;

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings, VentasDbContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public UserResponse Auth(AuthRequest model)
        {
            UserResponse userResponse = new UserResponse();
            Console.WriteLine("Hasta aca llego");
            string spassword = Encriptar.GetSHA256(model.Password);
            var user = _context.Usuarios.FirstOrDefault(
                x => x.Email == model.Email && x.Password == spassword);
            if (user == null) return null;
            userResponse.Email = model.Email;
            userResponse.Token = GetToken(user);
            return userResponse;
        }

        private string GetToken(Usuario usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKeyword);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                    new Claim(ClaimTypes.Email, usuario.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(90),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

}
