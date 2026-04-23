namespace Testify.Domain.Entities
{
    public class BancoPregunta
    {
        public long banPreId { get; set; }

        public long empId { get; set; }

        

        public long catIdEstado { get; set; }
        public long usuIdReg { get; set; }
        public DateTime banPreFechaReg { get; set; }
        public long? usuIdAct { get; set; }
        public DateTime? banPreFechaAct { get; set; }

    }
}
