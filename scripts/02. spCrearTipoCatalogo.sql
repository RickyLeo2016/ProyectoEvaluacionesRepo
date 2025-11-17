USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE dbo.spCrearTipoCatalogo
@tipCatDescripcion varchar(200),
@tipCatEstado char(1)
AS        
BEGIN      
	insert into TipoCatalogo(tipCatDescripcion,tipCatEstado,tipCatFechaReg)
	values(@tipCatDescripcion,@tipCatEstado,GETDATE())
END
