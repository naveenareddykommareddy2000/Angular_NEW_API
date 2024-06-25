using Microsoft.EntityFrameworkCore;
using TimeProject.Models;

namespace TimeProject.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<DelayedData> DelayedData {  get; set; }
    }
}
