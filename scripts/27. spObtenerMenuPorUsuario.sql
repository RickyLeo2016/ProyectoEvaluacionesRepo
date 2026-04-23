use TestifyDB
go
CREATE PROCEDURE [dbo].spObtenerMenuPorUsuario
@usuId BIGINT,
@PageNumber int=null,
@PageSize int=null
AS        
BEGIN      
 SET NOCOUNT ON;

       SELECT DISTINCT
            M.menId,
            M.menNombre,
            M.menIcono,
            M.menRuta,
            CASE 
                when M.menPadreId=0 then NULL
                else  M.menPadreId
            END 
            menPadreId,
            M.menOrden,
            ISNULL(M.menPadreId, M.menId) AS ordenPadre
        FROM UsuarioRol UR
        INNER JOIN RolMenu RM ON UR.rolId = RM.rolId
        INNER JOIN Menu M ON M.menId = RM.menId
        WHERE UR.usuId = @usuId
          AND UR.catIdEstado = 1
          AND RM.catIdEstado = 1
        ORDER BY M.menOrden;

END

