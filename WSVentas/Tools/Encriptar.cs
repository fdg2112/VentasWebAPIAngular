using System.Security.Cryptography;
using System.Text;

public class Encriptar
{
    public static string GetSHA256(string str)
    {
        using SHA256 sha256 = SHA256.Create();
        byte[] bytes = Encoding.ASCII.GetBytes(str);
        byte[] hash = sha256.ComputeHash(bytes);
        StringBuilder sb = new StringBuilder(hash.Length * 2);
        foreach (byte b in hash)
        {
            sb.AppendFormat("{0:x2}", b);
        }
        return sb.ToString();
    }
}
