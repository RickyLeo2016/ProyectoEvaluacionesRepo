use TestifyDB
go
Create PROCEDURE [dbo].spListarCatalogoPorId
@catId bigint
AS        
BEGIN      
	select 
		catId,
		catNombre,
		case
			when catEstado = 'A' tHen 'Activo' else 'Inactivo'
		end catEstado,
		convert(varchar,catFechaReg,25) catFechaRegistro
	from Catalogo
	where catEstado='A'
	and catId=@catId

END
