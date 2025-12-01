use TestifyDB
go
Create PROCEDURE [dbo].spListarEmpresaPorId
@empId bigint
AS        
BEGIN      
	select 
		empId,
		empNombre,
		case
			when empEstado = 1 tHen 'Activo' else 'Inactivo'
		end catEstado,
		convert(varchar,empFechaReg,25) catFechaRegistro
	from Empresa
	where empEstado=1
	and empId=@empId

END
