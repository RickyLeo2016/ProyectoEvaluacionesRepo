use TestifyDB
go
CREATE PROCEDURE [dbo].[spListarTipoCatalogo]
@PageNumber int=null,
@PageSize int=null
AS        
BEGIN      
	select 
		tipCatId,
		tipCatDescripcion,
		case
			when tipCatEstado = 'A' tHen 'Activo' else 'Inactivo'
		end tipCatEstado,
		convert(varchar,tipCatFechaReg,25)tipCatFechaRegistro
	from TipoCatalogo
	where tipCatEstado='A'
	order by tipCatDescripcion
	OFFSET (@PageNumber-1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
