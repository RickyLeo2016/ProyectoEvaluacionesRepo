using Testify.Application.UseCase.Commons.Bases;


namespace Testify.Application.UseCase.Commons.Exeptions
{
    public class ValidationExceptions : Exception
    {
        public IEnumerable<BaseErrors>? Errors { get; set; }
        public ValidationExceptions() : base()
        {
            Errors = new List<BaseErrors>();

        }

        public ValidationExceptions(IEnumerable<BaseErrors>? errors) : this()
        {
            Errors = errors;
        }
    }
}
