namespace App;

internal sealed record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC + 0.5556 + num);

    private readonly int num = 3;
}