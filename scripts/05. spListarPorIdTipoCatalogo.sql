use TestifyDB
go
CREATE PROCEDURE [dbo].spListarPorIdTipoCatalogo
@tipCatId bigint
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
	and tipCatId=@tipCatId
END
