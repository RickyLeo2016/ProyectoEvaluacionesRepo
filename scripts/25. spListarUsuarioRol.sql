use TestifyDB
go
Create PROCEDURE [dbo].[spListarUsuarioRol]
@usuId bigint,
@PageNumber int=null,
@PageSize int=null
AS       
BEGIN    
    SELECT 
        r.rolId,
        r.rolNombre,
        --CASE 
        --    WHEN ur.usuId IS NOT NULL THEN CAST(1 AS BIT)
        --    ELSE CAST(0 AS BIT)
        --END AS 
        ur.catIdEstado
        rolSelec
    FROM Rol r
    LEFT JOIN UsuarioRol ur ON ur.rolId = r.rolId and ur.usuId = @usuId 
    order by r.rolNombre
    OFFSET (@PageNumber-1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
