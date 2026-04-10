use TestifyDB
go
Create PROCEDURE [dbo].spListarMenu
@PageNumber int=null,
@PageSize int=null
AS        
BEGIN      

	select 
		m.menId,
		m.menNombre,
		m.menIcono,
		m.menRuta,
		m.menPadreId, 
		m.menOrden,   
		convert(varchar,m.menFechaReg,25) fechaReg,
		c.catNombre menEstadoDesc,
		isnull(m2.menNombre,'Es Padre') esPadre

	from Menu m
	join Catalogo c on catId=m.catIdEstado
	left join Menu m2 on m2.menId=m.menPadreId
 	where m.catIdEstado=1
	order by m.menNombre
	OFFSET (@PageNumber-1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;

END
