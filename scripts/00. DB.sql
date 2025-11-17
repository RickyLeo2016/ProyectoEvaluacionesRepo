use master
go
-- ======================================
-- Base de Datos Testify
-- Sistema de Evaluaciones Psicometricas y Técnicas
-- ======================================
create database TestifyDB
go 
use TestifyDB
go
--------------------------------------------------------------
-- Tabla: TipoCatalogo
--------------------------------------------------------------
CREATE TABLE TipoCatalogo
(
    tipCatId BIGINT IDENTITY(1,1) NOT NULL,
    tipCatNombre NVARCHAR(150) NOT NULL,
    tipCatDescripcion NVARCHAR(500) NULL,
    tipCatEstado CHAR(1) NOT NULL DEFAULT 'A',
    tipCatIdReg BIGINT NOT NULL,
    tipCatFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    tipCatIdAct BIGINT NULL,
    tipCatFechaAct DATETIME NULL,
    CONSTRAINT Pk_TipoCatalogo PRIMARY KEY (tipCatId)
);

--------------------------------------------------------------
-- Tabla: Catalogo
--------------------------------------------------------------
CREATE TABLE Catalogo
(
    catId BIGINT IDENTITY(1,1) NOT NULL,
    tipCatId BIGINT NOT NULL,
    catNombre NVARCHAR(150) NOT NULL,
    catDescripcion NVARCHAR(500) NULL,
    catEstado CHAR(1) NOT NULL DEFAULT 'A',
    catIdReg BIGINT NOT NULL,
    catFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    catIdAct BIGINT NULL,
    catFechaAct DATETIME NULL,
    CONSTRAINT Pk_Catalogo PRIMARY KEY (catId),
    CONSTRAINT Fk_Catalogo_TipoCatalogo FOREIGN KEY (tipCatId) REFERENCES TipoCatalogo(tipCatId)
);


--------------------------------------------------------------
-- Tabla: Empresa
--------------------------------------------------------------
CREATE TABLE Empresa
(
    empId BIGINT IDENTITY(1,1) NOT NULL,
    empNombre NVARCHAR(150) NOT NULL,
    empRuc NVARCHAR(13) NOT NULL,
    empDireccion NVARCHAR(250) NOT NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuFechaAct DATETIME NULL,
    CONSTRAINT Pk_Empresa PRIMARY KEY (EmpId),
    CONSTRAINT Fk_Empresa_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
);

--------------------------------------------------------------
-- Tabla: Usuario
-- Usuarios globales, único por email y dni
--------------------------------------------------------------
CREATE TABLE Usuario
(
    usuId BIGINT IDENTITY(1,1) NOT NULL,
    usuNombre NVARCHAR(150) NOT NULL,
    usuEmail NVARCHAR(150) NOT NULL UNIQUE,
    usuPassHash NVARCHAR(250) NOT NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuFechaAct DATETIME NULL,
    CONSTRAINT Pk_Usuario PRIMARY KEY (UsuId),
    CONSTRAINT Fk_Usuario_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
);

--------------------------------------------------------------
-- Tabla: UsuarioDetalle
--------------------------------------------------------------
CREATE TABLE UsuarioDetalle
(
    usuDetId BIGINT IDENTITY(1,1) NOT NULL,
    usuId BIGINT NOT NULL,
    empId BIGINT NOT NULL,
    usuDetDNI NVARCHAR(20) NOT NULL,
    usuNombres NVARCHAR(150) NOT NULL,
    usuApellidos NVARCHAR(150) NOT NULL,
    usuTelefono NVARCHAR(15) NULL,
    usuCelular NVARCHAR(15) NULL,
    usuDireccion NVARCHAR(500) NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuFechaAct DATETIME NULL,
    CONSTRAINT Pk_UsuarioDetalle PRIMARY KEY (UsuDetId),
    CONSTRAINT Fk_UsuarioDetalle_Usuario FOREIGN KEY (usuId) REFERENCES Usuario(usuId),
    CONSTRAINT Fk_UsuarioDetalle_Empresa FOREIGN KEY (empId) REFERENCES Empresa(empId),
    CONSTRAINT Fk_UsuarioDetalle_Catalogo FOREIGN KEY (catIdEstado) REFERENCES Catalogo(CatId)
);

--------------------------------------------------------------
-- Tabla: Rol
--------------------------------------------------------------
CREATE TABLE Rol
(
    rolId BIGINT IDENTITY(1,1) NOT NULL,
    rolNombre NVARCHAR(150) NOT NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuFechaAct DATETIME NULL,
    CONSTRAINT Pk_Rol PRIMARY KEY (RolId),
    CONSTRAINT Fk_Rol_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
);

--------------------------------------------------------------
-- Tabla: UsuarioRol
--------------------------------------------------------------
CREATE TABLE UsuarioRol
(
    usuRolId BIGINT IDENTITY(1,1) NOT NULL,
    usuId BIGINT NOT NULL,
    rolId BIGINT NOT NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuFechaAct DATETIME NULL,
    CONSTRAINT Pk_UsuarioRol PRIMARY KEY (UsuRolId),
    CONSTRAINT Fk_UsuarioRol_Usuario FOREIGN KEY (UsuId) REFERENCES Usuario(UsuId),
    CONSTRAINT Fk_UsuarioRol_Rol FOREIGN KEY (RolId) REFERENCES Rol(RolId),
    CONSTRAINT Fk_UsuarioRol_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
);

--------------------------------------------------------------
-- Tabla: Menu
-- Control de menú y submenús por nivel
--------------------------------------------------------------
CREATE TABLE Menu
(
    menuId BIGINT IDENTITY(1,1) NOT NULL,
    menuPadreId BIGINT NULL, -- NULL = menú principal
    menuNombre NVARCHAR(150) NOT NULL,
    menuUrl NVARCHAR(250) NULL,
    nivel INT NOT NULL,
    orden INT NOT NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuFechaAct DATETIME NULL,
    CONSTRAINT Pk_Menu PRIMARY KEY (MenuId),
    CONSTRAINT Fk_Menu_MenuPadre FOREIGN KEY (MenuPadreId) REFERENCES Menu(MenuId),
    CONSTRAINT Fk_Menu_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
);


--------------------------------------------------------------
-- Tabla: Evaluacion
--------------------------------------------------------------
CREATE TABLE Evaluacion
(
    evalId BIGINT IDENTITY(1,1) NOT NULL,
    empId BIGINT NOT NULL,
    evalNombre NVARCHAR(150) NOT NULL,
    evalDescripcion NVARCHAR(500) NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuFechaAct DATETIME NULL,
    CONSTRAINT Pk_Evaluacion PRIMARY KEY (EvalId),
    CONSTRAINT Fk_Evaluacion_Empresa FOREIGN KEY (EmpId) REFERENCES Empresa(EmpId),
    CONSTRAINT Fk_Evaluacion_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
);

----------------------------------------------------------------
---- Tabla: Pregunta
----------------------------------------------------------------
--CREATE TABLE Pregunta
--(
--    PregId BIGINT IDENTITY(1,1) NOT NULL,
--    EvalId BIGINT NOT NULL,
--    PregTexto NVARCHAR(MAX) NOT NULL,
--    PregImagen VARBINARY(MAX) NULL,
--    CatIdEstado BIGINT NOT NULL,
--    usuIdReg BIGINT NOT NULL,
--    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
--    usuIdAct BIGINT NULL,
--    usuFechaAct DATETIME NULL,
--    CONSTRAINT Pk_Pregunta PRIMARY KEY (PregId),
--    CONSTRAINT Fk_Pregunta_Evaluacion FOREIGN KEY (EvalId) REFERENCES Evaluacion(EvalId),
--    CONSTRAINT Fk_Pregunta_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
--);

----------------------------------------------------------------
---- Tabla: Respuesta
----------------------------------------------------------------
--CREATE TABLE Respuesta
--(
--    respId BIGINT IDENTITY(1,1) NOT NULL,
--    pregId BIGINT NOT NULL,
--    respTexto NVARCHAR(MAX) NULL,
--    respImagen VARBINARY(MAX) NULL,
--    esCorrecta BIT NOT NULL DEFAULT 0,
--    catIdEstado BIGINT NOT NULL,
--    usuIdReg BIGINT NOT NULL,
--    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
--    usuIdAct BIGINT NULL,
--    usuFechaAct DATETIME NULL,
--    CONSTRAINT Pk_Respuesta PRIMARY KEY (RespId),
--    CONSTRAINT Fk_Respuesta_Pregunta FOREIGN KEY (PregId) REFERENCES Pregunta(PregId),
--    CONSTRAINT Fk_Respuesta_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
--);

