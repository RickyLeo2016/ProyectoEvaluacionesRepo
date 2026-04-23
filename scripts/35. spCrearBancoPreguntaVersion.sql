use TestifyDB
go
CREATE PROCEDURE spCrearBancoPreguntaVersion
(
    @banPreId BIGINT,
    @catIdTipo BIGINT,
    @banPreVerPuntaje DECIMAL(10,2),
    @banPreVerEnunciado NVARCHAR(MAX),
    @banPreVerDataSchema NVARCHAR(MAX),
    @banPreVerUiSchema NVARCHAR(MAX),
    @usuId BIGINT
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @nuevaVersion INT;

    BEGIN TRY
        BEGIN TRAN;

        ---------------------------------------------------
        -- VALIDAR EXISTENCIA
        ---------------------------------------------------
        IF NOT EXISTS (SELECT 1 FROM BancoPregunta WHERE banPreId = @banPreId)
        BEGIN
            RAISERROR('La pregunta no existe',16,1);
        END

         ---------------------------------------------------
        -- DESACTIVAR VERSIÓN ANTERIOR
        -- desactivar versión anterior
        UPDATE BancoPreguntaVersion
        SET catIdEstado = 2
        WHERE banPreId = @banPreId
        ---------------------------------------------------
        -- OBTENER SIGUIENTE VERSION
        ---------------------------------------------------
        SELECT @nuevaVersion = ISNULL(MAX(banPreVerNumero),0) + 1
        FROM BancoPreguntaVersion
        WHERE banPreId = @banPreId;

        ---------------------------------------------------
        -- CREAR NUEVA VERSION
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
            @nuevaVersion,
            @usuId
        );

        COMMIT;

        SELECT 
            '0000' AS Codigo,
            'Pregunta versionada correctamente' AS Mensaje,
            @nuevaVersion AS Data;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;

        SELECT 
            '9999' AS Codigo,
            ERROR_MESSAGE() AS Mensaje,
            0 AS Data;
    END CATCH
END