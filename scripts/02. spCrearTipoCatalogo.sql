USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spCrearTipoCatalogo
@tipCatDescripcion varchar(200),
@tipCatEstado char(1),
@usuIdReg int
AS        
BEGIN      
	insert into TipoCatalogo(tipCatNombre,tipCatDescripcion,tipCatEstado,tipCatFechaReg,usuIdReg)
	values(@tipCatDescripcion,@tipCatDescripcion,@tipCatEstado,GETDATE(),@usuIdReg)
END
