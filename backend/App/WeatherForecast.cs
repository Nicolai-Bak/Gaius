namespace App;

internal sealed record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    private readonly int num = 3;
    public int TemperatureF => 32 + (int)(TemperatureC + 0.5556 + num);
}
