use TestifyDB
go

insert into TipoCatalogo(tipCatNombre,tipCatDescripcion,tipCatEstado,tipCatFechaReg)
values('Estados de registros','Estados de registros','A',SYSDATETIME()) 


insert into TipoCatalogo(tipCatNombre,tipCatDescripcion,tipCatEstado,tipCatFechaReg)
values('Géneros de personas ','Géneros de personas ','A',SYSDATETIME()) 

insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg)
values(1,'Activo', 'Estado Activo', 'A', SYSDATETIME())
insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg)
values(1,'Inactivo', 'Estado Inctivo', 'A', SYSDATETIME())


insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg)
values(2,'Femenino', 'Detalle Femenino', 'A', SYSDATETIME())

insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg)
values(2,'Masculino', 'Detalle Masculino', 'A', SYSDATETIME())


insert into Empresa(empNombre,empRuc, empDireccion, empEstado, usuIdReg, empFechaReg)
values('Corps S.A.', '1721390902001', 'Anonima', 1,0, SYSDATETIME() )


insert into usuario(usuNombre,usuEmail,usuPassHash, catIdEstado, usuFechaReg, usuIdReg)
values('rsigcha','rleo.9016@gmail.com','$2a$11$WzNyUh9xd211hDH0pSPyRu4EQBGzj0L6bGMKl10Qh9yRgZwIzEqFm',1,SYSDATETIME(),0)

insert into UsuarioDetalle(usuId,empId,usuDetDNI,usuNombres,usuApellidos, usuCelular,catIdEstado,usuFechaReg,usuIdReg)
values(1,1,'1721390902','Ricardo David', 'Sigcha Sigcha','0986631684',1,SYSDATETIME(),0)
