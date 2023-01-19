// CA1852 Type 'Program' can be sealed because it has no subtypes in its containing assembly and is not externally visible
#pragma warning disable CA1852
using System.Security.Cryptography;
using App;

const string ALLOW_ALL_ORIGINS = "allow_all_origins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(
    options =>
        options.AddPolicy(
            name: ALLOW_ALL_ORIGINS,
            policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
        )
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var summaries = new[]
{
    "Freezing",
    "Bracing",
    "Chilly",
    "Cool",
    "Mild",
    "Warm",
    "Balmy",
    "Hot",
    "Sweltering",
    "Scorching",
};

app.MapGet(
        "/weather-forecast",
        () =>
            Enumerable
                .Range(1, 10)
                .Select(
                    index =>
                        new WeatherForecast(
                            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                            RandomNumberGenerator.GetInt32(-20, 55),
                            summaries[RandomNumberGenerator.GetInt32(summaries.Length)]
                        )
                )
                .ToArray()
    )
    .WithName("GetWeatherForecast")
    .WithOpenApi();

app.UseCors(ALLOW_ALL_ORIGINS);

app.Run();
