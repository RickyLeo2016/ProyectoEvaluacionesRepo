USE TestifyDB
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE dbo.spCrearCatalogo
@tipCatId bigint,
@catNombre varchar(200),
@catDescripcion varchar(200),
@catEstado char(1),
@usuIdReg int
AS        
BEGIN      
	insert into Catalogo(
		tipCatId,
		catNombre,
		catDescripcion,
		catEstado,
		catFechaReg,
		usuIdReg)
	values(
		@tipCatId,
		@catNombre,
		@catDescripcion,
		@catEstado,
		GETDATE(),
		@usuIdReg)

	 SELECT @@ROWCOUNT AS RowsAffected;
END
