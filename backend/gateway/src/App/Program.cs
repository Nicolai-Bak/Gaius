// CA1852 Type 'Program' can be sealed because it has no subtypes in its containing assembly and is not externally visible
#pragma warning disable CA1852
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", true, true);

builder.Services.AddOcelot();

var app = builder.Build();

app.UseRouting();
app.UseOcelot();

app.Run();
