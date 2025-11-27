use TestifyDB
go
CREATE PROCEDURE [dbo].spListarEmpresaPorId
@empId bigint
AS        
BEGIN      
	select 
		empId codigo,
		empNombre descripcion,
		case
			when empEstado = 'A' tHen 'Activo' else 'Inactivo'
		end catEstado,
		convert(varchar,empFechaReg,25) catFechaRegistro
	from Empresa
	where empEstado='A'
	and empId=@empId

END
