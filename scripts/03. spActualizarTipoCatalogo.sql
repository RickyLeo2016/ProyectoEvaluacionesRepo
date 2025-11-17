USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE dbo.spActualizarTipoCatalogo
@tipCatId bigint,
@tipCatDescripcion varchar(200),
@tipCatEstado char(1),
@usuIdReg int
AS        
BEGIN      
	update TipoCatalogo
		set 
		tipCatNombre=@tipCatDescripcion,
		tipCatDescripcion=@tipCatDescripcion,
		tipCatEstado=@tipCatEstado,
		tipCatFechaAct=SYSDATETIME()
	where tipCatId=@tipCatId
END
