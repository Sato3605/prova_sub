using System.Security.Cryptography;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapGet("/", () => "Teste");

app.MapPost("/api/aluno/cadastrar", ([FromBody] Aluno aluno,
    [FromServices] AppDataContext ctx) =>
{
    ctx.Alunos.Add(aluno);
    ctx.SaveChanges();
    return Results.Created($"/aluno/{aluno.Id}", aluno);
});



app.MapPost("/api/imc/cadastrar", ([FromBody] Imc imc,
    [FromServices] AppDataContext ctx) =>
{
    //Validar se o funcionário existe
    Aluno? aluno =
        ctx.Alunos.Find(imc.AlunoId);

    if (aluno is null)
        return Results.NotFound("Aluno não encontrado");

    imc.Aluno = aluno;

    //Calcular o imc
    
    imc.Faixa = imc.Peso / (imc.Altura * imc.Altura);

    //Calcular o IRRF
    if (imc.Faixa <= 18.5)
        imc.Classificacao = "Magreza";
    if (imc.Faixa <= 24.9)
        imc.Classificacao = "Normal";
    if (imc.Faixa <= 29.9)
        imc.Classificacao = "Sobrepeso";
    if (imc.Faixa <= 39.9)
        imc.Classificacao = "Obesidade";
    else
        imc.Classificacao = "Obesidade grave";

    ctx.Imcs.Add(imc);
    ctx.SaveChanges();
    return Results.Created($"/aluno/{imc.Id}", imc);
});



app.MapGet("/api/imc/listar", ([FromServices] AppDataContext ctx) =>
{
    return Results.Ok(ctx.Imcs.Include(x => x.Aluno).ToList());
});



app.MapGet("/api/imc/buscar/{nome}/{sobrenome}", ([FromServices] AppDataContext ctx,
    [FromRoute] string nome, [FromRoute] string sobrenome) =>
{
    Imc? imc = ctx.Imcs.
        Include(x => x.Aluno).
        FirstOrDefault(f => f.Aluno.Nome == nome && f.Aluno.Sobrenome == sobrenome);
    if (imc is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(imc);
});

app.Run();
