use TestifyDB
go
CREATE PROCEDURE [dbo].spListarCatalogoPorId
@catId bigint
AS        
BEGIN      
	select 
		catId codigo,
		catDescripcion descripcion,
		case
			when catEstado = 'A' tHen 'Activo' else 'Inactivo'
		end catEstado,
		convert(varchar,catFechaReg,25) catFechaRegistro
	from Catalogo
	where catEstado='A'
	and catId=@catId

END
