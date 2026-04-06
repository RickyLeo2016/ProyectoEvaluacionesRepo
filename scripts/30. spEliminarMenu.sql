USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spEliminarMenu
@menId        BIGINT,
@usuIdReg     INT
AS  
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRAN;

        Update Menu
        set 
            catIdEstado=2,
            usuIdAct=@usuIdReg,
            menFechaAct=SYSDATETIME()
        where menId=@menId

        COMMIT;

        SELECT 
            '0000' AS Codigo,
            'Menú eliminado correctamente' AS Mensaje,
            @menId AS Data;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;

        DECLARE @errorNumber INT = ERROR_NUMBER();
        DECLARE @errorMessage NVARCHAR(4000) = ERROR_MESSAGE();

        SELECT 
            '9999' AS Codigo,
            @errorMessage AS Mensaje,
            0 AS Data;
        
    END CATCH
END
