using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDBContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if(await UserExists(registerDto.Email))
        {
            return BadRequest("Email is already taken.");
        }
        
       using var hmac= new HMACSHA512();

       var user= new AppUser
        {
            Email = registerDto.Email.ToLower(),
            DisplayName = registerDto.DisplayName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();
        var token = tokenService.CreateToken(user);
        var userDto = user.ToDto(tokenService);
        return userDto;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user =await context.Users.SingleOrDefaultAsync(u => u.Email == loginDto.Email.ToLower());
        if(user == null) return Unauthorized("Invalid email.");

        using var hmac= new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password)); 

        for(int i=0; i<computedHash.Length; i++)
        {
            if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password.");
        }

        var token = tokenService.CreateToken(user);
        var userDto = user.ToDto(tokenService);
        return userDto;
    } 

    private async Task<bool> UserExists(string email)
    {
        return await context.Users.AnyAsync(u => u.Email == email.ToLower());
    }
}