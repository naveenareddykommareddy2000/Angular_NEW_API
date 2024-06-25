//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using TimeProject.Models;
//using TimeProject.Data;
//using Microsoft.EntityFrameworkCore;

//namespace TimeProject.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class Data : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;
//        public Data(ApplicationDbContext context)
//        {
//            _context = context;
//        }
//        [HttpPost("DataWithDelay")]
//        public async Task<IActionResult> SaveDataWithDelay( )
//        {
//            for (int i = 1; i <= 25; i++)
//            {
//                var data = new DelayedData
//                {
//                    Value = i,
//                };

//                _context.DelayedData.Add(data);
//                await _context.SaveChangesAsync();

//                await Task.Delay(1000);
//            }

//            return Ok();
//        }

//        [HttpGet("GetCount")]
//        public async Task<IActionResult> GetCount()
//        {
//            var count12 = await _context.DelayedData.CountAsync();
//            var x = new countData()
//            {
//                count = count12
//            };
//            return Ok(x);
//        }
//    }
//}
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using TimeProject.Data;
using TimeProject.Models;

[Route("api/[controller]")]
[ApiController]
public class DataController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private static bool isPaused = false;

    public DataController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("DataWithDelay")]
    public async Task<IActionResult> SaveDataWithDelay()
    {
        for (int i = 1; i <= 25; i++)
        {
            if (isPaused)
            {
                while (isPaused)
                {
                    await Task.Delay(1000);
                }
            }

            var count = new DelayedData { Value = i };
            _context.DelayedData.Add(count);
            await _context.SaveChangesAsync();
            await Task.Delay(1000);
        }
        return Ok();
    }

    [HttpGet("GetCount")]
    public IActionResult GetCount()
    {
        var count1 = _context.DelayedData.ToList();
        var count = count1.Count;
        return Ok(new {count=count}); 
    }

    [HttpPost("Pause")]
    public IActionResult Pause()
    {
        isPaused = true;
        return Ok();
    }

    [HttpPost("Resume")]
    public IActionResult Resume()
    {
        isPaused = false;
        return Ok();
    }
}
