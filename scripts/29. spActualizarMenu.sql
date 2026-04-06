USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spActualizarMenu
@menId        BIGINT,
@menNombre    VARCHAR(100),
@menIcono     VARCHAR(50) NULL,
@menRuta      VARCHAR(200) NULL,
@menPadreId   BIGINT NULL, 
@menOrden     INT,
@usuIdReg     INT
AS  
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRAN;

        Update Menu
        set 
         menNombre=@menNombre,
            menIcono=@menIcono,
            menRuta=@menRuta,
            menPadreId=@menPadreId, 
            menOrden=@menOrden,
            usuIdAct=@usuIdReg,
            menFechaAct=SYSDATETIME()
        where menId=@menId

        COMMIT;

        SELECT 
            '0000' AS Codigo,
            'Menu actualizado correctamente' AS Mensaje,
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
