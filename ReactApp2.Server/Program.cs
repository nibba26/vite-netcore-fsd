using ReactApp2.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// JwtTokenService 
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.AddScoped<JwtTokenService>();

// ✅ CORS 설정 추가 (여기서 origin 주소는 프론트엔드 도메인 또는 IP)
builder.Services.AddCors(options => {
	options.AddPolicy("AllowFrontend", policy => {
		policy.WithOrigins("http://localhost:5101")  // 또는 "https://your-frontend-domain.com"
			  .AllowAnyHeader()
			  .AllowAnyMethod()
			  .AllowCredentials(); // 쿠키 전송 허용
	});
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
	app.UseSwagger();
	app.UseSwaggerUI();
}

// 개발 환경에서 HTTPS 리디렉션 제거
if (!app.Environment.IsDevelopment()) {
	app.UseHttpsRedirection();
}

// ✅ CORS 미들웨어 추가 - Authorization 앞에 위치
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
