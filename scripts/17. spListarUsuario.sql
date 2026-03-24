use TestifyDB
go
Create PROCEDURE [dbo].[spListarUsuario]
@PageNumber int=null,
@PageSize int=null
AS        
BEGIN      

	select 
		u.usuId,
		e.empId,
		e.empNombre,
		usuNombre,
		usuEmail,
		usuDetDNI,
		usuNombres,
		usuApellidos,
		usuTelefono,
		usuCelular,
		convert(varchar,u.usuFechaReg,25) usuFechaReg,
		c.catNombre usuEstadoDesc,
		u.catIdEstado 

	from Usuario u
	join UsuarioDetalle d on d.usuId=u.usuId
	join Empresa e on e.empId=d.empId
	join Catalogo c on catId=u.catIdEstado
	where u.catIdEstado=1
	order by d.usuApellidos
	OFFSET (@PageNumber-1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;

END
