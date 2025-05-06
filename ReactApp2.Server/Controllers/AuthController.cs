using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Services;

namespace ReactApp2.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
	private readonly JwtTokenService _jwtTokenService;
	private const string CookieName = "access_token";

	public AuthController(JwtTokenService jwtTokenService) {
		_jwtTokenService = jwtTokenService;
	}

	[HttpPost("login")]
	public IActionResult Login([FromBody] LoginRequest request) {
		// ���� ���� ���� ������ ���� (DB Ȯ�� ��)

		var token = _jwtTokenService.GenerateToken(request.Username, "Admin");

		Response.Cookies.Append("access_token", token, new CookieOptions {
			HttpOnly = true,
			Secure = true,         // HTTPS ȯ�濡���� ����
			SameSite = SameSiteMode.Strict,
			Expires = DateTimeOffset.UtcNow.AddMinutes(60)
		});

		return Ok(new { message = "Login successful", success = true });

		//return Unauthorized();
	}



	/// <summary>
	/// HttpOnly ��Ű�� ����� JWT�� �о ��ȯ�մϴ�.
	/// </summary>
	[HttpGet("getToken")]
	public IActionResult GetToken() {
		if (!Request.Cookies.TryGetValue(CookieName, out var token) || string.IsNullOrEmpty(token)) {
			// ��ū�� ������ 401 Unauthorized
			return Unauthorized(new { message = "No token found in cookie." });
		}

		// ���Ȼ�, �� �ʿ��� ��쿡�� Ŭ���̾�Ʈ�� ��ū�� �����ϼ���
		return Ok(new { token });
	}

	[HttpGet("getMyInfo")]
	public IActionResult GetCurrentUser() {
		// ��Ű���� ��ū ������
		if (!Request.Cookies.TryGetValue("access_token", out var jwt) || string.IsNullOrEmpty(jwt))
			return Unauthorized();

		// ��ū �Ľ�
		var handler = new JwtSecurityTokenHandler();
		var token = handler.ReadJwtToken(jwt);

		// �ʿ��� Ŭ���Ӹ� �̾Ƽ� ��ȯ
		var userInfo = new {
			UserId = token.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value,
			Role = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value,
			Expires = token.ValidTo
		};

		return Ok(userInfo);
	}
}

public class LoginRequest {
	public string Username { get; set; }
	public string Password { get; set; }
}
