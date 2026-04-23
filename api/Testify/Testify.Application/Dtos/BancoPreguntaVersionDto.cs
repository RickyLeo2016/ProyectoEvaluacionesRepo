public class BancoPreguntaVersionDto
{
    public long banPreId { get; set; }
    public long empId { get; set; }

    public long banPreVerId { get; set; }
    public long catIdTipo { get; set; }
    public string tipPreguntaDesc { get; set; }

    public decimal banPreVerPuntaje { get; set; }
    public string banPreVerEnunciado { get; set; }

    public string banPreVerDataSchema { get; set; }
    public string banPreVerUiSchema { get; set; }

    public int banPreVerNumero { get; set; }

    public DateTime? fechaReg { get; set; }
}