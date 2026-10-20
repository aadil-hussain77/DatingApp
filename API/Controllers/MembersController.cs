using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MembersController(AppDBContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
    {
        var members = await context.Users.ToListAsync();
        return members;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetMember(string id)
    {
        var member = await context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (member == null) return NotFound();
        return member;
    }
}