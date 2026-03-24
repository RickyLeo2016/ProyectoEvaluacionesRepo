use TestifyDB
go
CREATE PROCEDURE dbo.spObtenerUsuarioPorNombre
    @usuNombre NVARCHAR(150)
AS
BEGIN
    SELECT TOP 1
        usuId,
        usuNombre,
        usuEmail,
        usuPassHash
    FROM Usuario
    WHERE usuNombre = @usuNombre;
END




