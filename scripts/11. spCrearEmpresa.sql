USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spCrearEmpresa
@empNombre varchar(150),
@empRuc varchar(13),
@empDireccion varchar(200),
@empEstado smallint,
@usuIdReg int
AS        
BEGIN      
	insert into Empresa(
		empNombre,
		empRuc,
		empDireccion,
		empEstado,
		usuIdReg,
		usuFechaReg
		)
	values(
		@empNombre,
		@empRuc,
		@empDireccion,
		@empEstado,
		@usuIdReg,
		GETDATE()
		)

	 SELECT @@ROWCOUNT AS RowsAffected;
END



