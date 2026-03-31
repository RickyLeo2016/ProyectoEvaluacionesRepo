use TestifyDB
go
Create PROCEDURE [dbo].spListarRol
@PageNumber int=null,
@PageSize int=null
AS        
BEGIN      

	select 
		r.rolId,
		r.rolNombre,
		convert(varchar,r.rolFechaReg,25) fechaReg,
		c.catNombre rolEstadoDesc,
		r.catIdEstado 
	from Rol r
	join Catalogo c on catId=r.catIdEstado
	where r.catIdEstado=1
	order by r.rolNombre
	OFFSET (@PageNumber-1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;

END
