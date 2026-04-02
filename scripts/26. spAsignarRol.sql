USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spAsignarRol
@usuId         BIGINT,
@xmlDatos      XML,
@usuIdReg      INT
AS  
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        BEGIN TRAN;

        ------------------------------------------------------------------
        -- 1) INPUT
        ------------------------------------------------------------------
        CREATE TABLE #RolesInput
        (
            usuId BIGINT NOT NULL,
            rolId BIGINT NOT NULL,
            rolSelec INT NOT NULL
        );

        INSERT INTO #RolesInput
        SELECT 
            RN.RelNode.value('(usuId/text())[1]','BIGINT'),
            RN.RelNode.value('(rolId/text())[1]','BIGINT'),
            RN.RelNode.value('(rolSelec/text())[1]','INT')
        FROM @xmlDatos.nodes('/Datos/Roles') AS RN(RelNode);

        ------------------------------------------------------------------
        -- 2) UPDATE (si ya existe)
        ------------------------------------------------------------------
        UPDATE UR
        SET 
            UR.catIdEstado =R.rolSelec,
            UR.usuIdAct = @usuIdReg,
            UR.usuRolFechaAct = SYSDATETIME()
        FROM UsuarioRol UR
        INNER JOIN #RolesInput R
            ON UR.usuId = R.usuId
           AND UR.rolId = R.rolId;

        ------------------------------------------------------------------
        -- 3) INSERT (si NO existe)
        ------------------------------------------------------------------
        INSERT INTO UsuarioRol
        (
            usuId,
            rolId,
            catIdEstado,
            usuIdReg,
            usuRolFechaReg
        )
        SELECT
            R.usuId,
            R.rolId,
            R.rolSelec,
            @usuIdReg,
            SYSDATETIME()
        FROM #RolesInput R
        WHERE NOT EXISTS (
            SELECT 1
            FROM UsuarioRol UR
            WHERE UR.usuId = R.usuId
              AND UR.rolId = R.rolId
        );

        COMMIT;

        SELECT 
            '0000' AS Codigo,
            'Roles asignados correctamente' AS Mensaje,
            1 AS Data;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;

        SELECT 
            '9999' AS Codigo,
            ERROR_MESSAGE() AS Mensaje,
            0 AS Data;
    END CATCH
END