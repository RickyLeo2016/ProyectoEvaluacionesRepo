USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE dbo.spEliminarCatalogo
@catId bigint,
@usuIdReg int
AS        
BEGIN      
	update Catalogo
		set catEstado='I',
		catFechaAct=SYSDATETIME()
	where catId=@catId


	 SELECT @@ROWCOUNT AS RowsAffected;
END
