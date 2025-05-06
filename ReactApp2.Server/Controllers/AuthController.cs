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
		// 실제 유저 인증 로직은 생략 (DB 확인 등)

		var token = _jwtTokenService.GenerateToken(request.Username, "Admin");

		Response.Cookies.Append("access_token", token, new CookieOptions {
			HttpOnly = true,
			Secure = true,         // HTTPS 환경에서만 전송
			SameSite = SameSiteMode.Strict,
			Expires = DateTimeOffset.UtcNow.AddMinutes(60)
		});

		return Ok(new { message = "Login successful", success = true });

		//return Unauthorized();
	}



	/// <summary>
	/// HttpOnly 쿠키에 저장된 JWT를 읽어서 반환합니다.
	/// </summary>
	[HttpGet("getToken")]
	public IActionResult GetToken() {
		if (!Request.Cookies.TryGetValue(CookieName, out var token) || string.IsNullOrEmpty(token)) {
			// 토큰이 없으면 401 Unauthorized
			return Unauthorized(new { message = "No token found in cookie." });
		}

		// 보안상, 꼭 필요한 경우에만 클라이언트로 토큰을 노출하세요
		return Ok(new { token });
	}

	[HttpGet("getMyInfo")]
	public IActionResult GetCurrentUser() {
		// 쿠키에서 토큰 꺼내기
		if (!Request.Cookies.TryGetValue("access_token", out var jwt) || string.IsNullOrEmpty(jwt))
			return Unauthorized();

		// 토큰 파싱
		var handler = new JwtSecurityTokenHandler();
		var token = handler.ReadJwtToken(jwt);

		// 필요한 클레임만 뽑아서 반환
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
