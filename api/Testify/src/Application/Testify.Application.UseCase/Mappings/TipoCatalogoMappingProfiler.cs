using AutoMapper;
using Testify.Application.Dto.TipoCatalogo.Response;
using Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.CreateCommand;
using Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.DeleteCommand;
using Testify.Application.UseCase.UseCase.TipoCatalogo.Commands.UpdateCommand;
using Testify.Domain.Entities;

namespace Testify.Application.UseCase.Mappings
{
    public class TipoCatalogoMappingProfiler : Profile
    {
        public TipoCatalogoMappingProfiler()
        {
            CreateMap<TipoCatalogo, GetByIdTipoCatalogoResponseDto>()
                .ReverseMap();

            CreateMap<CreateTipoCatalogoCommand, TipoCatalogo>();
            CreateMap<UpdateTipoCatalogoCommand, TipoCatalogo>();
            CreateMap<DeleteTipoCatalogoCommand, TipoCatalogo>();
        }
    }
}
