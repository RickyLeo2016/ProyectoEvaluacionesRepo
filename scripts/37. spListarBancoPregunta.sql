use  TestifyDB
go
CREATE PROCEDURE [dbo].spListarBancoPregunta
@empId bigint=null,
@PageNumber INT = NULL,
@PageSize INT = NULL
AS
BEGIN

    SET NOCOUNT ON;

    SELECT 
        bp.banPreId,
        bp.empId,

        v.banPreVerId,
        v.catIdTipo,
        c.catNombre tipoPreguntaDesc,

        v.banPreVerPuntaje ,
        v.banPreVerEnunciado ,

        v.banPreVerDataSchema ,
        v.banPreVerUiSchema ,

        v.banPreVerNumero ,

        CONVERT(VARCHAR, bp.banPreFechaReg, 25) AS fechaReg

    FROM BancoPregunta bp
    INNER JOIN (
        SELECT *,
               ROW_NUMBER() OVER (
                   PARTITION BY banPreId 
                   ORDER BY banPreVerNumero DESC
               ) AS rn
        FROM BancoPreguntaVersion
        WHERE catIdEstado = 1
    ) v 
        ON bp.banPreId = v.banPreId 
        AND v.rn = 1
    INNER JOIN Catalogo c ON c.catId = v.catIdTipo
    WHERE bp.catIdEstado = 1
    and bp.empId=@empId
    ORDER BY bp.banPreId DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;

END