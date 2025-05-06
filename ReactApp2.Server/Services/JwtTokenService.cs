using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ReactApp2.Server.Services;
public class JwtTokenService {
	private readonly JwtSettings _jwtSettings;

	public JwtTokenService(IOptions<JwtSettings> jwtOptions) {
		_jwtSettings = jwtOptions.Value;
	}

	public string GenerateToken(string userId, string role) {
		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey!));
		var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var claims = new[]
		{
			new Claim(JwtRegisteredClaimNames.Sub, userId),
			new Claim(ClaimTypes.Role, role),
			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
		};

		var token = new JwtSecurityToken(
			issuer: _jwtSettings.Issuer,
			audience: _jwtSettings.Audience,
			claims: claims,
			expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiresInMinutes),
			signingCredentials: creds
		);

		return new JwtSecurityTokenHandler().WriteToken(token);
	}
}


public class JwtSettings {
	public string? SecretKey { get; set; }
	public string? Issuer { get; set; }
	public string? Audience { get; set; }
	public int ExpiresInMinutes { get; set; }
}