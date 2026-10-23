using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUserExtension
{
    public static UserDto ToDto(this AppUser user, ITokenService tokenService)
    {
        return new UserDto
        {
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user),
            Email = user.Email,
            Id = user.Id
        };
    }
}