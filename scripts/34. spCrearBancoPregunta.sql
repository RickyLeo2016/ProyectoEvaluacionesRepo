use  TestifyDB
go
Create PROCEDURE spCrearBancoPregunta
(
    @empId BIGINT,
    @catIdTipo BIGINT,
    @banPreVerPuntaje DECIMAL(10,2),
    @banPreVerEnunciado NVARCHAR(MAX),
    @banPreVerDataSchema NVARCHAR(MAX),
    @banPreVerUiSchema NVARCHAR(MAX) = NULL,

    @usuId BIGINT
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @banPreId BIGINT;

    BEGIN TRY
        BEGIN TRAN;

        ---------------------------------------------------
        -- 1. CREAR BANCO PREGUNTA
        ---------------------------------------------------
        INSERT INTO BancoPregunta (
            empId,
            usuIdReg
        )
        VALUES (
            @empId,
            @usuId
        );

        SET @banPreId = SCOPE_IDENTITY();
        ---------------------------------------------------
        -- 2. CREAR VERSION INICIAL
        ---------------------------------------------------
        INSERT INTO BancoPreguntaVersion (
            banPreId,
            catIdTipo,
            banpreVerPuntaje,
            banPreVerEnunciado,
            banPreVerDataSchema,
            banPreVerUiSchema,
            banPreVerNumero,
            usuIdReg
        )
        VALUES (
            @banPreId,
            @catIdTipo,
            @banPreVerPuntaje,
            @banPreVerEnunciado,
            @banPreVerDataSchema,
            @banPreVerUiSchema,
            1,
            @usuId
        );

        COMMIT;

        SELECT 
            '0000' AS Codigo,
            'Pregunta creada correctamente' AS Mensaje,
            @banPreId AS Data;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;

        SELECT 
            '9999' AS Codigo,
            ERROR_MESSAGE() AS Mensaje,
            0 AS Data;
    END CATCH
END