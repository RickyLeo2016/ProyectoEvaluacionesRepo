use TestifyDB
go

insert into TipoCatalogo(tipCatNombre,tipCatDescripcion,tipCatEstado,tipCatFechaReg,usuIdReg)
values('Estados de registros','Estados de registros','A',SYSDATETIME(),0) 


insert into TipoCatalogo(tipCatNombre,tipCatDescripcion,tipCatEstado,tipCatFechaReg,usuIdReg)
values('Géneros de personas ','Géneros de personas ','A',SYSDATETIME(),0) 

insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg,usuIdReg)
values(1,'Activo', 'Estado Activo', 'A', SYSDATETIME(),0)
insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg,usuIdReg)
values(1,'Inactivo', 'Estado Inctivo', 'A', SYSDATETIME(),0)


insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg,usuIdReg)
values(2,'Femenino', 'Detalle Femenino', 'A', SYSDATETIME(),0)

insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg,usuIdReg)
values(2,'Masculino', 'Detalle Masculino', 'A', SYSDATETIME(),0)

insert into TipoCatalogo(tipCatNombre,tipCatDescripcion,tipCatEstado,tipCatFechaReg,usuIdReg)
values('Tipos de Evaluación','Tipos de Evaluación','A',SYSDATETIME(),0) 

insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg, usuIdReg)
values(3,'Psicométrica', 'Psicométrica', 'A', SYSDATETIME(),0)
insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg, usuIdReg)
values(3,'Técnica', 'Técnica', 'A', SYSDATETIME(),0)
insert into Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg, usuIdReg)
values(3,'Conductual', 'Conductual', 'A', SYSDATETIME(),0)


insert into TipoCatalogo(tipCatNombre,tipCatDescripcion,tipCatEstado,tipCatFechaReg,usuIdReg)
values('Tipos de Pregunta','Tipos de Pregunta','A',SYSDATETIME(),0) 

INSERT INTO Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg,usuIdReg)
VALUES
-- =========================
-- SELECCIÓN BÁSICA
-- =========================

(4,'multiple_choice',
'Una sola respuesta correcta. Control: RadioButton. Ejemplo: ¿Cuál es la capital de Ecuador? (Quito, Guayaquil, Cuenca)',
'A',SYSDATETIME(),0),

(4,'multiple_select',
'Varias respuestas correctas. Control: Checkbox. Ejemplo: ¿Cuáles son lenguajes de programación? (Python , HTML , Word )',
'A',SYSDATETIME(),0),

(4,'true_false',
'Verdadero o Falso. Control: RadioButton o Toggle. Ejemplo: El sol es una estrella (Verdadero / Falso)',
'A',SYSDATETIME(),0),

-- PSICOMÉTRICAS

(4,'likert',
'Escala de 1 a 5 o 1 a 7. Control: RadioButton horizontal. Ejemplo: Trabajo en equipo: [1 Egoísta — 2 — 3 — 4 — 5 Colaborativo]',
'A',SYSDATETIME(),0),

(4,'semantic_differential',
'Escala entre dos extremos. Control: Slider. Ejemplo: Responsable [1 Irresponsable — 5 Responsable]',
'A',SYSDATETIME(),0),

(4,'rating_scale',
'Calificación visual o numérica. Control: Stars o Slider. Ejemplo: Califica la experiencia: estrellas',
'A',SYSDATETIME(),0),

-- RESPUESTA ABIERTA

(4,'text_short',
'Respuesta corta. Control: TextBox. Ejemplo: ¿Cuál es tu nombre?',
'A',SYSDATETIME(),0),

(4,'text_long',
'Respuesta larga. Control: TextArea. Ejemplo: Describe tu experiencia laboral',
'A',SYSDATETIME(),0),

(4,'structured_text',
'Formulario estructurado. Control: múltiples inputs. Ejemplo: Nombre + Edad + Experiencia',
'A',SYSDATETIME(),0),

-- NUMÉRICAS

(4,'numeric',
'Respuesta numérica exacta. Control: Number Input. Ejemplo: 10 + 5 = ?',
'A',SYSDATETIME(),0),

(4,'numeric_range',
'Valor dentro de rango. Control: Number Input. Ejemplo: Años de experiencia (0–40)',
'A',SYSDATETIME(),0),

-- SITUACIONALES

(4,'situational_judgment',
'Escenario con mejor decisión. Control: RadioButton. Ejemplo: Cliente molesto, ¿qué haces primero?',
'A',SYSDATETIME(),0),

(4,'case_study',
'Caso largo con análisis. Control: Texto + opciones. Ejemplo: Empresa en crisis financiera, analiza solución',
'A',SYSDATETIME(),0),

-- TÉCNICAS

(4,'code',
'Escribir código. Control: Code Editor. Ejemplo: función que sume dos números en C#',
'A',SYSDATETIME(),0),

(4,'code_fix',
'Corregir código. Control: Code Editor. Ejemplo: corrige error en método C#',
'A',SYSDATETIME(),0),

(4,'sql_query',
'Escribir consulta SQL. Control: Code Editor. Ejemplo: listar usuarios activos',
'A',SYSDATETIME(),0),

-- LÓGICA

(4,'ordering',
'Ordenar pasos. Control: Drag & Drop. Ejemplo: proceso de login',
'A',SYSDATETIME(),0),

(4,'matching',
'Relacionar columnas. Control: Dropdown o DragDrop. Ejemplo: lenguaje → paradigma',
'A',SYSDATETIME(),0),

-- INTERACCIÓN AVANZADA

(4,'drag_drop_order',
'Ordenar elementos visualmente. Control: Drag & Drop. Ejemplo: prioridades del proyecto',
'A',SYSDATETIME(),0),

(4,'drag_drop_match',
'Emparejar elementos visualmente. Control: Drag & Drop. Ejemplo: país → bandera',
'A',SYSDATETIME(),0),

-- COGNITIVOS


(4,'pattern_recognition',
'Series lógicas. Control: TextBox o RadioButton. Ejemplo: 2,4,8,16, ?',
'A',SYSDATETIME(),0),

(4,'matrix_reasoning',
'Razonamiento visual tipo matrices. Control: Imagen + opciones. Ejemplo: test tipo Raven',
'A',SYSDATETIME(),0);


insert into TipoCatalogo(tipCatNombre,tipCatDescripcion,tipCatEstado,tipCatFechaReg,usuIdReg)
values('Estado de Evaluación','Estado de Evaluación','A',SYSDATETIME(),0) 

INSERT INTO Catalogo(tipCatId,catNombre,catDescripcion,catEstado,catFechaReg,usuIdReg)
VALUES

(5,'No iniciada','Evaluación no iniciada','A',SYSDATETIME(),0),
(5,'En proceso' ,'Evaluación en proceso','A',SYSDATETIME(),0),
(5,'Finalizada' ,'Evaluación finalizada','A',SYSDATETIME(),0)






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
('Default', 'fas fa-chart-line', '/dashboard/default', 1, 1, 1, 1);

-- Seguridad
INSERT INTO Menu (menNombre, menIcono, menRuta, menPadreId, menOrden, catIdEstado, usuIdReg)
VALUES 
('Menú', 'fas fa-bars-staggered', '/seguridad/menu', 2, 1, 1, 1),
('Rol', 'fas fa-briefcase', '/seguridad/rol', 2, 2, 1, 1),
('Usuario', 'fas fa-user', '/seguridad/usuario', 2, 3, 1, 1),
('Usuario Rol', 'fas fa-users', '/seguridad/usuario-rol', 2, 4, 1, 1),
('Rol Menú', 'fas fa-file-shield', '/seguridad/rol-menu', 2, 5, 1, 1);

-- Configuración
INSERT INTO Menu (menNombre, menIcono, menRuta, menPadreId, menOrden, catIdEstado, usuIdReg)
VALUES 
('Tipo Catálogo', 'fas fa-list', '/config/tipo-catalogo', 3, 1, 1, 1),
('Catálogo', 'fas fa-list-alt', '/config/catalogo', 3, 2, 1, 1),
('Empresa', 'fas fa-building', '/config/empresa', 3, 3, 1, 1);


insert into RolMenu(rolId,menId, catIdEstado,usuIdReg,rolMenFechaReg)
values
(1,1,1,1,SYSDATETIME()),
(1,2,1,1,SYSDATETIME()),
(1,3,1,1,SYSDATETIME()),
(1,4,1,1,SYSDATETIME()),
(1,5,1,1,SYSDATETIME()),
(1,6,1,1,SYSDATETIME()),
(1,7,1,1,SYSDATETIME()),
(1,8,1,1,SYSDATETIME()),
(1,9,1,1,SYSDATETIME()),
(1,10,1,1,SYSDATETIME()),
(1,11,1,1,SYSDATETIME()),
(1,12,1,1,SYSDATETIME());



insert into UsuarioRol(usuId,rolId,catIdEstado,usuIdReg,usuRolFechaReg)
values 
(1,1,1,1,SYSDATETIME())

