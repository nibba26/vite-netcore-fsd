using Microsoft.AspNetCore.Mvc;

namespace ReactApp2.Server.Controllers {
	[ApiController]
	[Route("api/members")]
	public class MemberController : ControllerBase {
		private static readonly string[] Summaries = new[]
		{
			"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
		};

		private readonly ILogger<WeatherForecastController> _logger;

		public MemberController(ILogger<WeatherForecastController> logger) {
			_logger = logger;
		}

		//      [HttpGet(Name = "CreateToken")]
		//      public IActionResult CreateToken()
		//      {



		//          return Ok();
		//      }

		[HttpGet]
		public List<MemberResponse> list() {

			List<MemberResponse> list = new() ;

			list.Add(new() { Email = "abc1@naver.com", Id = "abc1", Name = "에이비시1" });
			list.Add(new() { Email = "abc2@naver.com", Id = "abc2", Name = "에이비시2" });
			list.Add(new() { Email = "abc3@naver.com", Id = "abc3", Name = "에이비시3" });
			list.Add(new() { Email = "abc4@naver.com", Id = "abc4", Name = "에이비시4" });
			list.Add(new() { Email = "abc5@naver.com", Id = "abc5", Name = "에이비시5" });
			list.Add(new() { Email = "abc6@naver.com", Id = "abc6", Name = "에이비시6" });

			return list;
		}
	}


}
public class MemberResponse {
	public string? Name { get; set; }
	public string? Id { get; set; }
	public string? Email { get; set; }

}
