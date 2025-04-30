using Microsoft.AspNetCore.Mvc;

namespace ReactApp2.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

  //      [HttpGet(Name = "CreateToken")]
  //      public IActionResult CreateToken()
  //      {



  //          return Ok();
  //      }

		//[HttpGet(Name = "my-token")]
		//public string GetMyToken() {

  //          return "";
		//}
	}
}
