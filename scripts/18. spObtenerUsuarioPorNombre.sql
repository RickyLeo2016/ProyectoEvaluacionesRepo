use TestifyDB
go
CREATE PROCEDURE dbo.spObtenerUsuarioPorNombre
    @usuNombre NVARCHAR(150)
AS
BEGIN
    SELECT TOP 1
        u.usuId,
        u.usuNombre,
        u.usuEmail,
        u.usuPassHash,
        LEFT(ud.usuNombres, CHARINDEX(' ', ud.usuNombres + ' ') - 1) AS usuNombres,
        LEFT(ud.usuApellidos, CHARINDEX(' ', ud.usuApellidos + ' ') - 1) AS usuApellidos,
        ud.empId
    FROM Usuario u
    join UsuarioDetalle ud on ud.usuId=u.usuId
    WHERE usuNombre = @usuNombre;
END




