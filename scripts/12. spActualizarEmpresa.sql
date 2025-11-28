USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spActualizarEmpresa
@empId bigint,
@empNombre varchar(150),
@empRuc varchar(13),
@empDireccion varchar(200),
@empEstado smallint,
@usuIdReg int
AS        
BEGIN      
	update Empresa
	set
		empNombre=@empNombre,
		empRuc=@empRuc,
		empDireccion=@empDireccion,
		empEstado=@empEstado,
		usuIdAct=@usuIdReg,
		empFechaReg=SYSDATETIME()
	where empId=@empId

	SELECT @@ROWCOUNT AS RowsAffected;
END



