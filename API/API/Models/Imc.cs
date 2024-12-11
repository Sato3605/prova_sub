namespace API.Models;

public class Imc
{
    public int Id { get; set; }
    public double Altura { get; set; }
    public double Peso { get; set; }
    public string? Classificacao { get; set; }
    public double Faixa { get; set; }
    public int AlunoId { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
    public Aluno? Aluno { get; set; }

}
