using AutoMapper;
using Testify.Application.UseCase.UseCase.Catalogo.Commands.CreateCommand;
using Testify.Application.UseCase.UseCase.Catalogo.Commands.UpdateCommand;
//using Testify.Application.UseCase.UseCase.Catalogo.Commands.DeleteCommand;
using Testify.Domain.Entities;

namespace Testify.Application.UseCase.Mappings
{
    public class CatalogoMappingProfiler : Profile
    {
        public CatalogoMappingProfiler()
        {
            //CreateMap<Catalogo, GetByIdCatalogoResponseDto>()
            //    .ReverseMap();

            CreateMap<CreateCatalogoCommand, Catalogo>();
            CreateMap<UpdateCatalogoCommand, Catalogo>();
            //CreateMap<DeleteCatalogoCommand, Catalogo>();
        }
    }
}
