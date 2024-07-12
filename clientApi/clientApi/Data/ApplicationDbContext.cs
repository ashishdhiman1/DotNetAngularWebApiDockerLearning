using clientApi.Model;
using Microsoft.EntityFrameworkCore;

namespace clientApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }  
    }
}
