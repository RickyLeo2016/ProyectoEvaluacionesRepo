use TestifyDB
go
Create PROCEDURE [dbo].spObtenerMenuPorRol
@rolId BIGINT,
@PageNumber int=null,
@PageSize int=null
AS        
BEGIN      
 SET NOCOUNT ON;
        SELECT DISTINCT 
            M.menId,
            M.menNombre,
            M.menOrden,
            ISNULL(RM.catIdEstado, 2) AS menSelec,
            CASE 
                WHEN M.menPadreId IS NULL THEN 'Es Padre'
                ELSE MP.menNombre
            END AS esPadre
        FROM Menu M
        LEFT JOIN RolMenu RM 
            ON RM.menId = M.menId 
            AND RM.rolId = @rolId
        LEFT JOIN Menu MP   
            ON MP.menId = M.menPadreId
        WHERE M.catIdEstado = 1  
        ORDER BY esPadre
        OFFSET (@PageNumber-1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY;
END

