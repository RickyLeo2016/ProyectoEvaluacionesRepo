use TestifyDB
go
CREATE PROCEDURE [dbo].[spListarEmpresa]
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
			when empEstado = 'A' tHen 'Activo' else 'Inactivo'
		end empEstado,
		convert(varchar,empFechaReg,25) empFechaRegistro
	from Empresa 
	where empEstado='A'
	order by empNombre
	OFFSET (@PageNumber-1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
