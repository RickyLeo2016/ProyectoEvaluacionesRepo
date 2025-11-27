use TestifyDB
go
CREATE PROCEDURE [dbo].[spListarCatalogo]
@PageNumber int=null,
@PageSize int=null
AS        
BEGIN      

	select 
		catId,
		t.tipCatId,
		t.tipCatDescripcion,
		c.catNombre,
		c.catDescripcion,
		case
			when catEstado = 'A' tHen 'Activo' else 'Inactivo'
		end catEstado,
		convert(varchar,catFechaReg,25) catFechaRegistro
	from Catalogo c
	join TipoCatalogo t on t.tipCatId=c.tipCatId
	where catEstado='A'
	order by catNombre
	OFFSET (@PageNumber-1) * @PageSize ROWS
	FETCH NEXT @PageSize ROWS ONLY;
END
