USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE dbo.spEliminarTipoCatalogo
@tipCatId bigint,
@usuIdReg int
AS        
BEGIN      
	update TipoCatalogo
		set tipCatEstado='I',
		tipCatFechaAct=SYSDATETIME()
	where tipCatId=@tipCatId


	 SELECT @@ROWCOUNT AS RowsAffected;
END
