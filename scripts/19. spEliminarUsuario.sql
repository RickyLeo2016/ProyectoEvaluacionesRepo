USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spEliminarUsuario
@usuId bigint,
@usuIdReg INT
AS  
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRAN;


        IF NOT EXISTS (SELECT 1 FROM Usuario WHERE usuId = @usuId)
        BEGIN
            SELECT '1001', 'El usuario no existe', 0;
            ROLLBACK;
            RETURN;
        END

        IF EXISTS (SELECT 1 FROM Usuario WHERE usuId = @usuId AND catIdEstado = 2)
        BEGIN
            SELECT '1002', 'El usuario ya fue eliminado', 0;
            ROLLBACK;
            RETURN;
        END

        update Usuario
        set catIdEstado=2,
            usuIdAct=@usuIdReg,
            usuFechaAct=SYSDATETIME()
        where usuId=@usuId

        Update UsuarioDetalle
        set catIdEstado=2,
            usuIdAct=@usuIdReg,
            usuFechaAct=SYSDATETIME()
        where usuId=@usuId
        

        COMMIT;

        SELECT 
            '0000' AS Codigo,
            'Usuario eliminado correctamente' AS Mensaje,
            0 AS Data;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;
        DECLARE @errorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        SELECT 
                '9999' AS Codigo,
                @errorMessage AS Mensaje,
                0 AS Data;
    END CATCH
END
