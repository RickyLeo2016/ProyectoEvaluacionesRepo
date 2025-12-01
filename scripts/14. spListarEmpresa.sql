use TestifyDB
go
Create PROCEDURE [dbo].[spListarEmpresa]
@PageNumber int=null,
@PageSize int=null
AS        
BEGIN      

	select 
		empId,
		empRuc,
		empNombre,
		empDireccion,
		case
			when empEstado = 1 tHen 'Activo' else 'Inactivo'
		end empEstadoDesc,
		convert(varchar,empFechaReg,25) empFechaReg
	from Empresa 
	where empEstado=1
	order by empNombre
	OFFSET (@PageNumber-1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
