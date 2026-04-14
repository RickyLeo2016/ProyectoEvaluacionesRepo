USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spAsignarMenuRol
@rolId         BIGINT,
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
            rolId BIGINT NOT NULL,
            menId BIGINT NOT NULL,
            menSelec INT NOT NULL
        );

        INSERT INTO #RolesInput
        SELECT 
            RN.RelNode.value('(rolId/text())[1]','BIGINT'),
            RN.RelNode.value('(menId/text())[1]','BIGINT'),
            RN.RelNode.value('(menSelec/text())[1]','INT')
        FROM @xmlDatos.nodes('/Datos/RolesMenu') AS RN(RelNode);

        ------------------------------------------------------------------
        -- 2) UPDATE (si ya existe)
        ------------------------------------------------------------------
        Update RM
        set RM.catIdEstado=R.menSelec,
            RM.usuIdAct = @usuIdReg,
            RM.rolMenFechaAct = SYSDATETIME()
        From RolMenu RM
        Join #RolesInput R 
            on RM.menId = R.menId
            and RM.rolId = R.rolId;

        ------------------------------------------------------------------
        -- 3) INSERT (si NO existe)
        ------------------------------------------------------------------
        INSERT INTO RolMenu
        (
            rolId,
            menId,
            catIdEstado,
            usuIdReg,
            rolMenFechaReg
        )
        SELECT
            R.rolId,
            R.menId,
            R.menSelec,
            @usuIdReg,
            SYSDATETIME()
        FROM #RolesInput R
        WHERE NOT EXISTS (
            SELECT 1
            FROM RolMenu RM
            WHERE RM.menId = R.menId
              AND RM.rolId = R.rolId
        );

        COMMIT;

        SELECT 
            '0000' AS Codigo,
            'Permisos asignados correctamente' AS Mensaje,
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