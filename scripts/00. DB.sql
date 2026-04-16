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
    usuIdReg BIGINT NOT NULL,
    tipCatFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    tipCatFechaAct DATETIME NULL,
    CONSTRAINT Pk_TipoCatalogo PRIMARY KEY (tipCatId)
);

--------------------------------------------------------------
-- Tabla: Catalogo
--------------------------------------------------------------
create TABLE Catalogo
(
    catId BIGINT IDENTITY(1,1) NOT NULL,
    tipCatId BIGINT NOT NULL,
    catNombre NVARCHAR(150) NOT NULL,
    catDescripcion NVARCHAR(500) NULL,
    catEstado CHAR(1) NOT NULL DEFAULT 'A',
    usuIdReg BIGINT NOT NULL,
    catFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    catFechaAct DATETIME NULL,
    CONSTRAINT Pk_Catalogo PRIMARY KEY (catId),
    CONSTRAINT Fk_Catalogo_TipoCatalogo FOREIGN KEY (tipCatId) REFERENCES TipoCatalogo(tipCatId)
);


--------------------------------------------------------------
-- Tabla: Empresa
--------------------------------------------------------------
create TABLE Empresa
(
    empId BIGINT IDENTITY(1,1) NOT NULL,
    empNombre NVARCHAR(150) NOT NULL,
    empRuc NVARCHAR(13) NOT NULL,
    empDireccion NVARCHAR(250) NOT NULL,
    empEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    empFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    empFechaAct DATETIME NULL,
    usuIdEli BIGINT NULL,
    empFechaEli DATETIME NULL,
    CONSTRAINT Pk_Empresa PRIMARY KEY (EmpId),
    CONSTRAINT Fk_Empresa_Catalogo FOREIGN KEY (empEstado) REFERENCES Catalogo(CatId)
);

----------------------------------------------------------------
---- Tabla: Usuario
---- Usuarios globales, único por email
----------------------------------------------------------------
create TABLE Usuario
(
    usuId BIGINT IDENTITY(1,1) NOT NULL,
    usuNombre NVARCHAR(150) NOT NULL,
    usuEmail NVARCHAR(150) NOT NULL,
    usuPassHash NVARCHAR(250) NOT NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuFechaAct DATETIME NULL,
    usuIdEli BIGINT NULL,
    usuFechaEli DATETIME NULL,
    CONSTRAINT Pk_Usuario PRIMARY KEY (UsuId),
    CONSTRAINT UQ_Usuario_usuEmail UNIQUE (usuEmail),
    CONSTRAINT Fk_Usuario_Catalogo FOREIGN KEY (catIdEstado) REFERENCES Catalogo(CatId)
);

----------------------------------------------------------------
---- Tabla: UsuarioDetalle
----------------------------------------------------------------
create TABLE UsuarioDetalle
(
    usuDetId BIGINT IDENTITY(1,1) NOT NULL,
    usuId BIGINT NOT NULL,
    empId BIGINT NOT NULL,
    usuDetDNI NVARCHAR(20) NOT NULL,
    usuNombres NVARCHAR(150) NOT NULL,
    usuApellidos NVARCHAR(150) NOT NULL,
    usuTelefono NVARCHAR(15) NULL,
    usuCelular NVARCHAR(15) NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuFechaAct DATETIME NULL,
    usuIdEli BIGINT NULL,
    usuFechaEli DATETIME NULL,
    CONSTRAINT Pk_UsuarioDetalle PRIMARY KEY (usuDetId),
    CONSTRAINT UQ_UsuarioDetalle_usuDetDNI UNIQUE (usuDetDNI),
    CONSTRAINT Fk_UsuarioDetalle_Usuario FOREIGN KEY (usuId) REFERENCES Usuario(usuId),
    CONSTRAINT Fk_UsuarioDetalle_Empresa FOREIGN KEY (empId) REFERENCES Empresa(empId),
    CONSTRAINT Fk_UsuarioDetalle_Catalogo FOREIGN KEY (catIdEstado) REFERENCES Catalogo(CatId)
);

----------------------------------------------------------------
---- Tabla: Rol
----------------------------------------------------------------
Create TABLE Rol
(
    rolId BIGINT IDENTITY(1,1) NOT NULL,
    rolNombre NVARCHAR(150) NOT NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    rolFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    rolFechaAct DATETIME NULL,
    usuIdEli BIGINT NULL,
    rolFechaEli DATETIME NULL,
    CONSTRAINT Pk_Rol PRIMARY KEY (RolId),
    CONSTRAINT Fk_Rol_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
);

----------------------------------------------------------------
---- Tabla: UsuarioRol
----------------------------------------------------------------
Create TABLE UsuarioRol
(
    usuRolId BIGINT IDENTITY(1,1) NOT NULL,
    usuId BIGINT NOT NULL,
    rolId BIGINT NOT NULL,
    catIdEstado BIGINT NOT NULL,
    usuIdReg BIGINT NOT NULL,
    usuRolFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    usuRolFechaAct DATETIME NULL,
    usuIdEli BIGINT NULL,
    usuRolFechaEli DATETIME NULL,
    CONSTRAINT Pk_UsuarioRol PRIMARY KEY (UsuRolId),
    CONSTRAINT Fk_UsuarioRol_Usuario FOREIGN KEY (UsuId) REFERENCES Usuario(UsuId),
    CONSTRAINT Fk_UsuarioRol_Rol FOREIGN KEY (RolId) REFERENCES Rol(RolId),
    CONSTRAINT Fk_UsuarioRol_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
);


----------------------------------------------------------------
---- Tabla: Menu
---- Control de menú y submenús por nivel
----------------------------------------------------------------

Create TABLE Menu
(
    menId        BIGINT IDENTITY,
    menNombre    VARCHAR(100) NOT NULL,
    menIcono     VARCHAR(50) NULL,
    menRuta      VARCHAR(200) NULL,
    menPadreId   BIGINT NULL, 
    menOrden     INT NOT NULL DEFAULT 0,
    catIdEstado   BIGINT NOT NULL DEFAULT 1,
    usuIdReg BIGINT NOT NULL,
    menFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    menFechaAct DATETIME NULL,
    CONSTRAINT Pk_Menu PRIMARY KEY (menId),
    --CONSTRAINT FK_Menu_Padre FOREIGN KEY (menPadreId) REFERENCES Menu(menId),
    CONSTRAINT Fk_Menu_Catalogo FOREIGN KEY (CatIdEstado) REFERENCES Catalogo(CatId)
);

----------------------------------------------------------------
---- Tabla: RolMenu
---- Control de menú y submenús por nivel
----------------------------------------------------------------

CREATE TABLE RolMenu
(
    rolMenId BIGINT IDENTITY PRIMARY KEY,
    rolId BIGINT NOT NULL,
    menId BIGINT NOT NULL,
    catIdEstado BIGINT NOT NULL DEFAULT 1,
    usuIdReg BIGINT NOT NULL,
    rolMenFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    rolMenFechaAct DATETIME NULL,
    CONSTRAINT UQ_RolMenu UNIQUE (rolId, menId),
    CONSTRAINT FK_RolMenu_Rol FOREIGN KEY (rolId) REFERENCES Rol(rolId),
    CONSTRAINT FK_RolMenu_Menu FOREIGN KEY (menId) REFERENCES Menu(menId),
    CONSTRAINT Fk_RolMenu_Catalogo FOREIGN KEY (catIdEstado) REFERENCES Catalogo(CatId)
);



/* =========================================================
   EVALUACION
========================================================= */
CREATE TABLE Evaluacion (
    evaId BIGINT IDENTITY,
    empId BIGINT NOT NULL,
    evaNombre NVARCHAR(200) NOT NULL,
    evaDescripcion NVARCHAR(MAX) NULL,
    catIdTipo BIGINT NOT NULL,
    evaTiempoLimiteMinutos INT NULL,
    evaAleatoria BIT NOT NULL DEFAULT 0,
    catIdEstado BIGINT NOT NULL DEFAULT 1,
    usuIdReg BIGINT NOT NULL,
    evaFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    evaFechaAct DATETIME NULL,
    CONSTRAINT PK_Evaluacion PRIMARY KEY (evaId),
    CONSTRAINT FK_Evaluacion_Empresa FOREIGN KEY (empId) REFERENCES Empresa(empId),
    CONSTRAINT FK_Evaluacion_Tipo FOREIGN KEY (catIdTipo) REFERENCES Catalogo(catId),
    CONSTRAINT FK_Evaluacion_Estado FOREIGN KEY (catIdEstado) REFERENCES Catalogo(catId),
    CONSTRAINT FK_Evaluacion_Usuario FOREIGN KEY (usuIdReg) REFERENCES Usuario(usuId)
);


/* =========================================================
   BANCO DE PREGUNTAS
========================================================= */
CREATE TABLE BancoPregunta (
    banPreId BIGINT IDENTITY,
    empId BIGINT NOT NULL,
    catIdTipo BIGINT NOT NULL,
    banPrePuntajeMax DECIMAL(10,2) NOT NULL DEFAULT 1,
    catIdEstado BIGINT NOT NULL DEFAULT 1,
    usuIdReg BIGINT NOT NULL,
    banPreFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    banPreFechaAct DATETIME NULL,
    CONSTRAINT PK_BancoPregunta PRIMARY KEY (banPreId),
    CONSTRAINT FK_BancoPregunta_Empresa FOREIGN KEY (empId) REFERENCES Empresa(empId),
    CONSTRAINT FK_BancoPregunta_Tipo FOREIGN KEY (catIdTipo) REFERENCES Catalogo(catId),
    CONSTRAINT FK_BancoPregunta_Estado FOREIGN KEY (catIdEstado) REFERENCES Catalogo(catId),
    CONSTRAINT FK_BancoPregunta_Usuario FOREIGN KEY (usuIdReg) REFERENCES Usuario(usuId)
);


/* =========================================================
   VERSIONES DE PREGUNTA
========================================================= */
CREATE TABLE BancoPreguntaVersion (
    banPreVerId BIGINT IDENTITY,
    banPreId BIGINT NOT NULL,
    banPreVerEnunciado NVARCHAR(MAX) NOT NULL,
    banPreVerDataSchema NVARCHAR(MAX) NOT NULL,
    banPreVerUiSchema NVARCHAR(MAX) NULL,
    banPreVerNumero INT NOT NULL DEFAULT 1,
    catIdEstado BIGINT NOT NULL DEFAULT 1,
    usuIdReg BIGINT NOT NULL,
    banPreVerFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    banPreVerFechaAct DATETIME NULL,
    CONSTRAINT PK_BancoPreguntaVersion PRIMARY KEY (banPreVerId),
    CONSTRAINT FK_BancoPreguntaVersion_BancoPregunta FOREIGN KEY (banPreId) REFERENCES BancoPregunta(banPreId),
    CONSTRAINT FK_BancoPreguntaVersion_Estado FOREIGN KEY (catIdEstado) REFERENCES Catalogo(catId),
    CONSTRAINT FK_BancoPreguntaVersion_Usuario FOREIGN KEY (usuIdReg) REFERENCES Usuario(usuId)
);


/* =========================================================
   EVALUACION - PREGUNTAS
========================================================= */
CREATE TABLE EvaluacionBancoPregunta (
    evaBanPreId BIGINT IDENTITY,
    evaId BIGINT NOT NULL,
    banPreId BIGINT NOT NULL,
    orden INT NOT NULL,
    CONSTRAINT PK_EvaluacionBancoPregunta PRIMARY KEY (evaBanPreId),
    CONSTRAINT FK_EvaluacionBancoPregunta_Evaluacion FOREIGN KEY (evaId) REFERENCES Evaluacion(evaId),
    CONSTRAINT FK_EvaluacionBancoPregunta_BancoPregunta FOREIGN KEY (banPreId) REFERENCES BancoPregunta(banPreId)
);


/* =========================================================
   INTENTO EVALUACION
========================================================= */
CREATE TABLE IntentoEvaluacion (
    intEvaId BIGINT IDENTITY,
    evaId BIGINT NOT NULL,
    usuId BIGINT NOT NULL,
    intEvaFechaInicio DATETIME NOT NULL DEFAULT SYSDATETIME(),
    intEvaFechaFin DATETIME NULL,
    intEvaPuntaje DECIMAL(10,2) NULL,
    catIdEstadoIntento BIGINT NOT NULL DEFAULT 31,
    catIdEstado BIGINT NOT NULL DEFAULT 1,
    -- Anti fraude
    intEvaIP VARCHAR(45) NULL,
    intEvaUserAgent NVARCHAR(255) NULL,
    intEvaToken NVARCHAR(100) NULL,
    usuIdReg BIGINT NOT NULL,
    intEvaFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    usuIdAct BIGINT NULL,
    intEvaFechaAct DATETIME NULL,
    CONSTRAINT PK_IntentoEvaluacion PRIMARY KEY (intEvaId),
    CONSTRAINT FK_IntentoEvaluacion_Evaluacion FOREIGN KEY (evaId) REFERENCES Evaluacion(evaId),
    CONSTRAINT FK_IntentoEvaluacion_Usuario FOREIGN KEY (usuId) REFERENCES Usuario(usuId),
    CONSTRAINT FK_IntentoEvaluacion_Estado FOREIGN KEY (catIdEstado) REFERENCES Catalogo(catId),
    CONSTRAINT FK_IntentoEvaluacion_EstadoIntento FOREIGN KEY (catIdEstadoIntento) REFERENCES Catalogo(catId)
);


/* =========================================================
   EXAMEN GENERADO (PREGUNTAS CONGELADAS)
========================================================= */
CREATE TABLE IntentoPregunta (
    intPreId BIGINT IDENTITY,
    intEvaId BIGINT NOT NULL,
    banPreId BIGINT NOT NULL,
    banPreVerId BIGINT NOT NULL,
    orden INT NOT NULL,
    -- Tiempo por pregunta
    intPreTiempoLimiteSegundos INT NULL,
    intPreFechaInicio DATETIME NULL,
    intPreFechaFin DATETIME NULL,
    intPreFechaReg DATETIME NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT PK_IntentoPregunta PRIMARY KEY (intPreId),
    CONSTRAINT FK_IntentoPregunta_Intento FOREIGN KEY (intEvaId) REFERENCES IntentoEvaluacion(intEvaId),
    CONSTRAINT FK_IntentoPregunta_BancoPregunta FOREIGN KEY (banPreId) REFERENCES BancoPregunta(banPreId),
    CONSTRAINT FK_IntentoPregunta_BancoPreguntaVersion FOREIGN KEY (banPreVerId) REFERENCES BancoPreguntaVersion(banPreVerId)
);


/* =========================================================
   RESPUESTA USUARIO
========================================================= */
CREATE TABLE RespuestaUsuario (
    respId BIGINT IDENTITY,
    intEvaId BIGINT NOT NULL,
    banPreId BIGINT NOT NULL,
    banPreVerId BIGINT NULL,
    respContenido NVARCHAR(MAX) NOT NULL,
    respEsCorrecta BIT NULL,
    respPuntaje DECIMAL(10,2) NULL,
    -- Anti fraude
    respTiempoSegundos INT NULL,
    respIntentos INT NOT NULL DEFAULT 1,
    respFecha DATETIME NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT PK_RespuestaUsuario PRIMARY KEY (respId),
    CONSTRAINT FK_RespuestaUsuario_Intento FOREIGN KEY (intEvaId) REFERENCES IntentoEvaluacion(intEvaId),
    CONSTRAINT FK_RespuestaUsuario_BancoPregunta FOREIGN KEY (banPreId) REFERENCES BancoPregunta(banPreId),
    CONSTRAINT FK_RespuestaUsuario_BancoPreguntaVersion FOREIGN KEY (banPreVerId) REFERENCES BancoPreguntaVersion(banPreVerId),
    CONSTRAINT UQ_RespuestaUsuario UNIQUE (intEvaId, banPreId)
);










/* =========================================================
   INDICES (RENDIMIENTO)
========================================================= */
CREATE INDEX IX_Pregunta_Evaluacion ON Evaluacion(evaId);
CREATE INDEX IX_IntentoEvaluacion_Usuario ON IntentoEvaluacion(usuId);
CREATE INDEX IX_RespuestaUsuario_Intento ON RespuestaUsuario(intEvaId);
CREATE INDEX IX_IntentoPregunta_Intento ON IntentoPregunta(intEvaId);