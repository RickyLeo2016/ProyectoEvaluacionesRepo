using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Testify.Infrastructure.Persistence
{
    public class ApplicationContext
    {
        private readonly string _connectionString;

        public ApplicationContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException(nameof(configuration), "Connection string is missing");
        }

        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);
    }
}
