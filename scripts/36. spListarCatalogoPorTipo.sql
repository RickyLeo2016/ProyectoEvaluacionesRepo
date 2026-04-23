use TestifyDB
go
Create PROCEDURE spListarCatalogoPorTipo
@tipCatId BIGINT
AS        
BEGIN      
    SELECT 
        c.catId,
        c.catNombre,
        c.catDescripcion,
        p.dataSchema,
        p.uiSchema

    FROM Catalogo c
    LEFT JOIN PreguntaEstructuraJson p 
        ON p.catId = c.catId
        AND p.catIdEstado = 1

    WHERE c.catEstado = 'A'
      AND c.tipCatId = @tipCatId
    ORDER BY c.catNombre
END