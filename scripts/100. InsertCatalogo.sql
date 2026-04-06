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



INSERT INTO Rol (rolNombre, catIdEstado, usuIdReg, rolFechaReg)
VALUES
  ('Administrador', 1, 1, SYSDATETIME()),
  ('Administrador Empresa', 1, 1, SYSDATETIME());


/*Menus*/
INSERT INTO Menu (menNombre, menIcono, menRuta, menPadreId, menOrden, catIdEstado, usuIdReg)
VALUES 
('Dashboard', 'fas fa-home', NULL, NULL, 1, 1, 1),
('Seguridad', 'fas fa-shield-alt', NULL, NULL, 2, 1, 1),
('Configuración', 'fas fa-cogs', NULL, NULL, 3, 1, 1)

/*SubMenus*/
-- Dashboard
INSERT INTO Menu (menNombre, menIcono, menRuta, menPadreId, menOrden, catIdEstado, usuIdReg)
VALUES 
('Default', 'fas fa-chart-line', '/dashboard', 1, 1, 1, 1);

-- Seguridad
INSERT INTO Menu (menNombre, menIcono, menRuta, menPadreId, menOrden, catIdEstado, usuIdReg)
VALUES 
('Rol', 'fas fa-briefcase', '/seguridad/rol', 2, 1, 1, 1),
('Usuario', 'fas fa-user', '/seguridad/usuario', 2, 2, 1, 1),
('Usuario Rol', 'fas fa-users', '/seguridad/usuario-rol', 2, 3, 1, 1);

-- Configuración
INSERT INTO Menu (menNombre, menIcono, menRuta, menPadreId, menOrden, catIdEstado, usuIdReg)
VALUES 
('Tipo Catálogo', 'fas fa-list', '/config/tipo-catalogo', 3, 1, 1, 1),
('Catálogo', 'fas fa-list-alt', '/config/catalogo', 3, 2, 1, 1),
('Empresa', 'fas fa-building', '/config/empresa', 3, 3, 1, 1);

