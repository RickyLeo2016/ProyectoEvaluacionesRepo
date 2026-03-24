USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spActualizarUsuario
@usuNombre NVARCHAR(150),
@usuEmail NVARCHAR(150),
@usuPassHash NVARCHAR(250),
@empId BIGINT,
@usuDetDNI NVARCHAR(20),
@usuNombres NVARCHAR(150),
@usuApellidos NVARCHAR(150),
@usuTelefono NVARCHAR(15) = NULL,
@usuCelular NVARCHAR(15),
@catIdEstado CHAR(1),
@usuIdReg INT
AS  
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRAN;
  DECLARE @vUsuId BIGINT;

        INSERT INTO Usuario(
            usuNombre,
            usuEmail,
            usuPassHash,
            catIdEstado,
            usuIdReg,
            usuFechaReg
        )
        VALUES (
            @usuNombre,
            @usuEmail,
            @usuPassHash,
            @catIdEstado,
            @usuIdReg,
            SYSDATETIME()
        );

        SET @vUsuId = SCOPE_IDENTITY();

        INSERT INTO UsuarioDetalle(
            usuId,
            empId,
            usuDetDNI,
            usuNombres,
            usuApellidos,
            usuTelefono,
            usuCelular,
            catIdEstado,
            usuIdReg,
            usuFechaReg
        )
        VALUES(
            @vUsuId,
            @empId,
            @usuDetDNI,
            @usuNombres,
            @usuApellidos,
            @usuTelefono,
            @usuCelular,
            @catIdEstado,
            @usuIdReg,
            SYSDATETIME()
        );

        COMMIT;

        SELECT 
            '0000' AS Codigo,
            'Usuario creado correctamente' AS Mensaje,
            @vUsuId AS Data;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;

        DECLARE @errorNumber INT = ERROR_NUMBER();
        DECLARE @errorMessage NVARCHAR(4000) = ERROR_MESSAGE();

        IF ERROR_MESSAGE() LIKE '%UQ_Usuario_usuEmail%'
        BEGIN
            SELECT 
                '1001' Codigo, 
                'El correo ya está registrado' Mensaje, 
                0 Data;
        END
        ELSE IF ERROR_MESSAGE() LIKE '%usuNombre%'
        BEGIN
            SELECT 
                '1002' Codigo, 
                'El nombre de usuario ya existe' Mensaje,
                0 Data;
        END
        ELSE IF ERROR_MESSAGE() LIKE '%UQ_UsuarioDetalle_usuDetDNI%'
        BEGIN
            SELECT 
                '1003' Codigo, 
                'El DNI ya está registrado' Mensaje,
                0 Data;
        END
        ELSE
        BEGIN
            SELECT 
                '9999' AS Codigo,
                @errorMessage AS Mensaje,
                0 AS Data;
        END
        
    END CATCH
END
