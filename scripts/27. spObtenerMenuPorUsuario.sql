use TestifyDB
go
Create PROCEDURE [dbo].spObtenerMenuPorUsuario
@usuId BIGINT
AS        
BEGIN      
 SET NOCOUNT ON;

        SELECT DISTINCT
            M.menId,
            M.menNombre,
            M.menIcono,
            M.menRuta,
            M.menPadreId,
            M.menOrden,
            ISNULL(M.menPadreId, M.menId) AS ordenPadre 
        FROM Menu M
        INNER JOIN RolMenu RM ON RM.menId = M.menId
        INNER JOIN UsuarioRol UR ON UR.rolId = RM.rolId
        WHERE UR.usuId = @usuId
          AND UR.catIdEstado = 1 
          AND M.catIdEstado = 1  
        ORDER BY ordenPadre, M.menOrden;

END

