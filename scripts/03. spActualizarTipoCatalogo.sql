USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE dbo.spActualizarTipoCatalogo
@tipCatId bigint,
@tipCatDescripcion varchar(200),
@tipCatEstado char(1)
AS        
BEGIN      
	update TipoCatalogo
		set tipCatDescripcion=@tipCatDescripcion,
		tipCatEstado=@tipCatEstado,
		tipCatFechaAct=SYSDATETIME()
	where tipCatId=@tipCatId
END
