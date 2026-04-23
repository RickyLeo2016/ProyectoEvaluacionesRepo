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


INSERT INTO PreguntaEstructuraJson (catId, dataSchema, uiSchema)
VALUES 

-- 8 multiple_choice
(8,
'{
  "type": "object",
  "properties": {
    "enunciado": { "type": "string" },
    "opciones": { "type": "array", "items": { "type": "string" } },
    "respuestaCorrecta": { "type": "string" }
  }
}',
'{
  "enunciado": { "ui:widget": "textarea" },
  "opciones": { "ui:widget": "array-text" },
  "respuestaCorrecta": { "ui:widget": "radio" }
}'),

-- 9 multiple_select
(9,
'{
  "type": "object",
  "properties": {
    "enunciado": { "type": "string" },
    "opciones": { "type": "array", "items": { "type": "string" } },
    "respuestasCorrectas": { "type": "array", "items": { "type": "string" } }
  }
}',
'{
  "enunciado": { "ui:widget": "textarea" },
  "opciones": { "ui:widget": "array-text" },
  "respuestasCorrectas": { "ui:widget": "checkboxes" }
}'),

-- 10 true_false
(10,
'{
  "type": "object",
  "properties": {
    "enunciado": { "type": "string" },
    "respuesta": { "type": "boolean" }
  }
}',
'{
  "enunciado": { "ui:widget": "textarea" },
  "respuesta": { "ui:widget": "radio" }
}'),

-- 11 likert
(11,
'{
  "type": "object",
  "properties": {
    "enunciado": { "type": "string" },
    "escala": { "type": "array", "items": { "type": "string" } },
    "respuesta": { "type": "number" }
  }
}',
'{
  "enunciado": { "ui:widget": "textarea" },
  "escala": { "ui:widget": "array-text" },
  "respuesta": { "ui:widget": "radio" }
}'),

-- 12 semantic_differential
(12,
'{
  "type": "object",
  "properties": {
    "enunciado": { "type": "string" },
    "izquierda": { "type": "string" },
    "derecha": { "type": "string" },
    "valor": { "type": "number" }
  }
}',
'{
  "enunciado": { "ui:widget": "textarea" },
  "izquierda": { "ui:widget": "text" },
  "derecha": { "ui:widget": "text" },
  "valor": { "ui:widget": "range" }
}'),

-- 13 rating_scale
(13,
'{
  "type": "object",
  "properties": {
    "enunciado": { "type": "string" },
    "min": { "type": "number" },
    "max": { "type": "number" },
    "valor": { "type": "number" }
  }
}',
'{
  "enunciado": { "ui:widget": "textarea" },
  "min": { "ui:widget": "number" },
  "max": { "ui:widget": "number" },
  "valor": { "ui:widget": "range" }
}'),

-- 14 text_short
(14,
'{
  "type": "object",
  "properties": {
    "respuesta": {
      "type": "string"
    }
  }
}',
 '{
  "respuesta": {
    "ui:widget": "text",
    "ui:placeholder": "Ingrese la información"
  }
}'
),
-- 15 text_long
(15,
'{
  "type": "object",
  "properties": {
    "respuesta": {
      "type": "string"
    }
  }
}',
'{
  "respuesta": {
    "ui:widget": "textarea",
    "ui:placeholder": "Ingrese la información detallada"
  }
}'
),

-- 16 structured_text
(16,
'{
  "type": "object",
  "properties": {
    "campos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "nombre": { "type": "string" },
          "valor": { "type": "string" }
        }
      }
    }
  }
}',
'{
  "campos": { "ui:widget": "dynamic-form" }
}'),

-- 17 numeric
(17,
'{
  "type": "object",
  "properties": {
    "enunciado": { "type": "string" },
    "respuesta": { "type": "number" }
  }
}',
'{
  "enunciado": { "ui:widget": "textarea" },
  "respuesta": { "ui:widget": "number" }
}'),

-- 18 numeric_range
(18,
'{
  "type": "object",
  "properties": {
    "min": { "type": "number" },
    "max": { "type": "number" },
    "respuesta": { "type": "number" }
  }
}',
'{
  "min": { "ui:widget": "number" },
  "max": { "ui:widget": "number" },
  "respuesta": { "ui:widget": "range" }
}'),

-- 19 situational_judgment
(19,
'{
  "type": "object",
  "properties": {
    "escenario": { "type": "string" },
    "opciones": { "type": "array", "items": { "type": "string" } },
    "respuesta": { "type": "string" }
  }
}',
'{
  "escenario": { "ui:widget": "textarea" },
  "opciones": { "ui:widget": "array-text" },
  "respuesta": { "ui:widget": "radio" }
}'),

-- 20 case_study
(20,
'{
  "type": "object",
  "properties": {
    "caso": { "type": "string" },
    "preguntas": { "type": "array", "items": { "type": "string" } }
  }
}',
'{
  "caso": { "ui:widget": "textarea" },
  "preguntas": { "ui:widget": "array-text" }
}'),

-- 21 code
(21,
'{
  "type": "object",
  "properties": {
    "codigoBase": {
      "type": "string"
    }
  }
}',
'{
  "codigoBase": {
    "ui:widget": "code-editor",
    "ui:placeholder": "Código base (opcional)"
  }
}'
),

-- 22 code_fix
(22,
'{
  "type": "object",
  "properties": {
    "codigo": { "type": "string" },
    "error": { "type": "string" },
    "solucion": { "type": "string" }
  }
}',
'{
  "codigo": { "ui:widget": "code-editor" },
  "error": { "ui:widget": "textarea" },
  "solucion": { "ui:widget": "textarea" }
}'),

-- 23 sql_query
(23,
'{
  "type": "object",
  "properties": {
    "consulta": { "type": "string" },
    "respuesta": { "type": "string" }
  }
}',
'{
  "consulta": { "ui:widget": "code-editor" },
  "respuesta": { "ui:widget": "textarea" }
}'),

-- 24 ordering
(24,
'{
  "type": "object",
  "properties": {
    "elementos": { "type": "array", "items": { "type": "string" } },
    "ordenCorrecto": { "type": "array", "items": { "type": "string" } }
  }
}',
'{
  "elementos": { "ui:widget": "drag-order" },
  "ordenCorrecto": { "ui:widget": "hidden" }
}'),

-- 25 matching
(25,
'{
  "type": "object",
  "properties": {
    "izquierda": { "type": "array", "items": { "type": "string" } },
    "derecha": { "type": "array", "items": { "type": "string" } }
  }
}',
'{
  "izquierda": { "ui:widget": "list" },
  "derecha": { "ui:widget": "list" }
}'),

-- 26 drag_drop_order
(26,
'{
  "type": "object",
  "properties": {
    "items": { "type": "array", "items": { "type": "string" } }
  }
}',
'{
  "items": { "ui:widget": "drag-order" }
}'),

-- 27 drag_drop_match
(27,
'{
  "type": "object",
  "properties": {
    "items": { "type": "array" },
    "targets": { "type": "array" }
  }
}',
'{
  "items": { "ui:widget": "drag-source" },
  "targets": { "ui:widget": "drag-target" }
}'),

-- 28 pattern_recognition
(28,
'{
  "type": "object",
  "properties": {
    "secuencia": { "type": "array", "items": { "type": "number" } },
    "respuesta": { "type": "number" }
  }
}',
'{
  "secuencia": { "ui:widget": "sequence-display" },
  "respuesta": { "ui:widget": "number" }
}'),

-- 29 matrix_reasoning
(29,
'{
  "type": "object",
  "properties": {
    "matriz": {
      "type": "array",
      "items": {
        "type": "array",
        "items": { "type": "number" }
      }
    },
    "respuesta": { "type": "number" }
  }
}',
'{
  "matriz": { "ui:widget": "matrix" },
  "respuesta": { "ui:widget": "number" }
}');
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

