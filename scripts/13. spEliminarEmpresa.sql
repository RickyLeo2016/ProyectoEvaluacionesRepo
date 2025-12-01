USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spEliminarEmpresa
@empId bigint,
@usuIdReg int
AS        
BEGIN      
	update Empresa
	set
		empEstado=2,
		usuIdEli=@usuIdReg,
		empFechaEli=SYSDATETIME()
	where empId=@empId

	SELECT @@ROWCOUNT AS RowsAffected;
END


