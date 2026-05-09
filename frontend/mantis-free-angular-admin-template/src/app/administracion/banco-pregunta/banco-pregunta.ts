import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Grid } from 'src/app/theme/shared/components/grid/grid';
import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';

import { CatalogoService } from 'src/app/services/catalogo/catalogo';
import { BancoPreguntaService } from 'src/app/services/banco-pregunta/banco-pregunta';
import { AuthService } from 'src/app/services/auth/auth-service';

import { TouchedDirective } from '../../theme/shared/directives/touched.directive';

// =========================
// 🔥 HIJOS (NO SE TOCAN)
// =========================
import { QTrueFalse } from './q-true-false/q-true-false';
import { QMultipleChoice } from './q-multiple-choice/q-multiple-choice';
import { QCode } from './q-code/q-code';
import { QCodeFix } from './q-code-fix/q-code-fix';
import { QNumeric } from './q-numeric/q-numeric';
import { QNumericRange } from './q-numeric-range/q-numeric-range';
import { QLikert } from './q-likert/q-likert';
import { QOrdering } from './q-ordering/q-ordering';
import { QRating } from './q-rating/q-rating';
import { QSemantic } from './q-semantic/q-semantic';
import { QMatching } from './q-matching/q-matching';
import { QDragOrder } from './q-drag-order/q-drag-order';
import { QDragDropMatch } from './q-drag-drop-match/q-drag-drop-match';
import { QSqlQuery } from './q-sql-query/q-sql-query';
import { QStructuredText } from './q-structured-text/q-structured-text';
import { QSituationalJudgment } from './q-situational-judgment/q-situational-judgment';
import { QCaseStudy } from './q-case-study/q-case-study';
import { QPatternRecognition } from './q-pattern-recognition/q-pattern-recognition';
import { QMatrixQuestion } from './q-matrix-question/q-matrix-question';
import { QText } from './q-text/q-text';

export interface IBancoPregunta {
  banPreId?: number;
  catIdTipo: number;
  tipoPreguntaDesc?: string;
  banPreVerPuntaje: number;
  banPreVerEnunciado: string;
  banPreVerDataSchema: string;
  banPreVerUiSchema?: string;
}

@Component({
  selector: 'app-banco-pregunta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    CardComponent,
    Grid,
    SpinnerComponent,
    TouchedDirective,

    QTrueFalse,
    QMultipleChoice,
    QCode,
    QCodeFix,
    QNumeric,
    QNumericRange,
    QLikert,
    QOrdering,
    QRating,
    QSemantic,
    QMatching,
    QDragOrder,
    QDragDropMatch,
    QSqlQuery,
    QStructuredText,
    QSituationalJudgment,
    QCaseStudy,
    QPatternRecognition,
    QMatrixQuestion,
    QText,
  ],
  templateUrl: './banco-pregunta.html'
})
export class BancoPregunta implements OnInit {

  //#region STATE
  spinnerVisible = signal(false);

  tiposPregunta = signal<any[]>([]);
  tipoSeleccionado = signal<number | null>(null);

  modoFormulario = signal(false);
  modoEdicion = signal(false);

  pregunta = signal('');
  descripcion = signal('');

  puntajeInput = signal('');
  puntaje = signal<number>(0);

  configPorTipo: Record<number, any> = {};

  banPreIdBase = signal<number | null>(null);

  bancoPregunta = signal<IBancoPregunta[]>([]);
  filtro = signal('');
  //#endregion

  constructor(
    private catService: CatalogoService,
    private bancoPreguntaService: BancoPreguntaService,
    private auth: AuthService
  ) {

    effect(() => {
      const tipo = this.tipoSeleccionado();
      const tipos = this.tiposPregunta();

      if (!tipo) {
        this.descripcion.set('');
        return;
      }

      const t = tipos.find(x => x.catId === tipo);
      this.descripcion.set(t?.catDescripcion || '');
    });
  }

  ngOnInit(): void {
    this.cargarTipos();
    this.cargarListaBancoPregunta();
  }

  //#region LOAD
  cargarTipos() {
    this.catService.obtenerCatalogoPorTipo(4).subscribe(res => {
      if (res.isSuccess) this.tiposPregunta.set(res.data);
    });
  }

  cargarListaBancoPregunta() {
    this.spinnerVisible.set(true);

    this.bancoPreguntaService.listarBancoPregunta().subscribe({
      next: res => {
        if (res.isSuccess) {
          this.bancoPregunta.set(res.data);
        }
        this.spinnerVisible.set(false);
      },
      error: () => {
        this.spinnerVisible.set(false);
        this.auth.logout();
      }
    });
  }
  //#endregion

  //#region FORM
  abrirFormulario() {
    this.resetFormulario();
    this.modoFormulario.set(true);
    this.modoEdicion.set(false);
  }

  cancelarFormulario() {
    this.modoFormulario.set(false);
    this.resetFormulario();
  }

  resetFormulario() {
    this.banPreIdBase.set(null);
    this.pregunta.set('');
    this.puntaje.set(1);
    this.puntajeInput.set('');
    this.tipoSeleccionado.set(null);
    this.configPorTipo = {};
  }
  //#endregion

  //#region EDIT
  crearVersion(item: IBancoPregunta) {

    this.resetFormulario();

    this.modoFormulario.set(true);
    this.modoEdicion.set(true);

    this.banPreIdBase.set(item.banPreId!);

    this.pregunta.set(item.banPreVerEnunciado);
    this.puntaje.set(item.banPreVerPuntaje);

    this.puntajeInput.set(
      item.banPreVerPuntaje.toString().replace('.', ',')
    );

    let schema: any = {};
    try {
      schema = JSON.parse(item.banPreVerDataSchema || '{}');
    } catch { }

    this.configPorTipo[item.catIdTipo] = schema;

    this.tipoSeleccionado.set(item.catIdTipo);
  }
  //#endregion

  //#region INPUT HIJOS




  onConfigChange(event: any) {
    const tipo = this.tipoSeleccionado();
    if (!tipo) return;
    const current = this.configPorTipo[tipo];

    // 🔥 evitar re-render innecesario
    if (JSON.stringify(current) === JSON.stringify(event)) return;

    this.configPorTipo[tipo] = event;
  }
  //#endregion

  //#region PUNTAJE (MANTENIDO)
  onPuntajeInput(event: Event) {
    let val = (event.target as HTMLInputElement).value;
    val = val.replace(/[^0-9,]/g, '');

    const num = Number(val.replace(',', '.'));
    if (num >= 100) return;

    this.puntajeInput.set(val);
    this.puntaje.set(num || 0);
  }

  onPuntajeBlur() {
    const num = this.puntaje();
    if (num != null) {
      this.puntajeInput.set(num.toFixed(2).replace('.', ','));
    }
  }
  //#endregion

  //#region VALIDACIÓN
  validarSchema(): boolean {

    const tipo = this.tipoSeleccionado();

    if (!tipo || !this.configPorTipo[tipo]) {
      Swal.fire('Error', 'Debe configurar la pregunta', 'warning');
      return false;
    }

    return true;
  }
  //#endregion


  //#region GUARDAR
  guardar() {



    if (!this.pregunta()) {
      Swal.fire('Error', 'Pregunta o enunciado es obligatorio', 'warning');
      return;
    }

    if (!this.tipoSeleccionado()) {
      Swal.fire('Error', 'Debe seleccionar un tipo', 'warning');
      return;
    }

    if (!this.puntaje() || this.puntaje() <= 0) {
      Swal.fire('Error', 'Puntaje inválido', 'warning');
      return;
    }


    if (!this.validarSchema()) return;

    // Validacion POR TIPO
    const tipo = this.tipoSeleccionado()!;
    if (!this.validarRespuestaPorTipo(tipo)) return;



    const config = this.configPorTipo[tipo];

    const esEdicion = this.modoEdicion();

    const payload: any = {
      catIdTipo: tipo,
      banPreVerPuntaje: this.puntaje(),
      banPreVerEnunciado: this.pregunta(),

      banPreVerDataSchema: JSON.stringify(config.dataSchema),
      banPreVerUiSchema: JSON.stringify(config.uiSchema)
    };
    // console.log(payload)

    if (esEdicion) {
      payload.banPreId = this.banPreIdBase();
    }

    this.spinnerVisible.set(true);

    const request = esEdicion
      ? this.bancoPreguntaService.crearVersion(payload)
      : this.bancoPreguntaService.crear(payload);

    request.subscribe({
      next: res => {
        this.spinnerVisible.set(false);

        if (res.isSuccess) {
          Swal.fire('OK', 'Guardado correctamente', 'success');
          this.cargarListaBancoPregunta();
          this.cancelarFormulario();
        } else {
          Swal.fire('Error', res.message || 'Error', 'error');
        }
      },
      error: () => {
        this.spinnerVisible.set(false);
        Swal.fire('Error', 'Error del servidor', 'error');
      }
    });
  }
  //#endregion

  //#region GRID DATA
  columnas = [
    { header: 'ID', field: 'banPreId' },
    { header: 'Tipo', field: 'tipPreguntaDesc' },
    { header: 'Pregunta', field: 'banPreVerEnunciado' },
    { header: 'Puntaje', field: 'banPreVerPuntaje' },
    { header: 'Versión', field: 'banPreVerNumero' },
    { header: 'Editar', field: 'acciones' }
  ];

  accionesTabla = [
    {
      icon: 'fas fa-code-branch',
      title: 'Nueva versión',
      color: '#f39c12',
      callback: (item: IBancoPregunta) => this.crearVersion(item)
    }
  ];

  tiposFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.bancoPregunta();

    return this.bancoPregunta().filter(t =>
      t.banPreVerEnunciado?.toLowerCase().includes(f)
    );
  });
  //#endregion


  //#region VALIDACION
  validarRespuestaPorTipo(tipo: number): boolean {

    const config = this.configPorTipo[tipo];

    switch (tipo) {

      // =========================
      // MULTIPLE CHOICE / MULTIPLE SELECT
      // =========================
      case 8: { // 🔹 SINGLE (radio)

        const data = config?.dataSchema ?? config;

        const opcionesInvalidas = data?.options?.some(
          (o: any) => !o.text || o.text.trim() === ''
        );

        if (opcionesInvalidas) {
          Swal.fire({
            icon: 'warning',
            title: 'Opciones incompletas',
            text: 'Todas las opciones deben tener texto'
          });
          return false;
        }

        if (data?.correctAnswer === null || data?.correctAnswer === undefined) {
          Swal.fire({
            icon: 'warning',
            title: 'Falta respuesta correcta',
            text: 'Debes seleccionar una opción correcta'
          });
          return false;
        }

        return true;
      }

      case 9: { // 🔹 MULTI (checkbox)

        const data = config?.dataSchema ?? config;

        const opcionesInvalidas = data?.options?.some(
          (o: any) => !o.text || o.text.trim() === ''
        );

        if (opcionesInvalidas) {
          Swal.fire({
            icon: 'warning',
            title: 'Opciones incompletas',
            text: 'Todas las opciones deben tener texto'
          });
          return false;
        }

        // 🔥 VALIDACIÓN ESPECÍFICA MULTI
        if (!Array.isArray(data?.correctAnswer) || data.correctAnswer.length === 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Falta respuesta correcta',
            text: 'Debes seleccionar al menos una opción correcta'
          });
          return false;
        }

        return true;
      }


      case 10: { // 🔥 usa el catId que corresponda

        const data = config?.dataSchema ?? config;

        // 🔥 1. validar estructura
        if (!data?.options || data.options.length !== 2) {
          Swal.fire({
            icon: 'warning',
            title: 'Configuración inválida',
            text: 'Debe haber exactamente dos opciones (Verdadero/Falso)'
          });
          return false;
        }

        // 🔥 2. validar textos
        const opcionesInvalidas = data.options.some(
          (o: any) => !o.text || o.text.trim() === ''
        );

        if (opcionesInvalidas) {
          Swal.fire({
            icon: 'warning',
            title: 'Texto incompleto',
            text: 'Las opciones Verdadero/Falso deben tener texto'
          });
          return false;
        }

        // 🔥 3. validar respuesta correcta (exactamente una)
        const correctas = data.options.filter((o: any) => o.isCorrect === true);

        if (correctas.length !== 1) {
          Swal.fire({
            icon: 'warning',
            title: 'Respuesta inválida',
            text: 'Debe haber exactamente una respuesta correcta'
          });
          return false;
        }

        return true;
      }

      case 11: { // 🔥 LIKERT

        const data = config?.dataSchema ?? config;

        // 🔥 1. validar existencia
        if (!data?.options || data.options.length < 2) {
          Swal.fire({
            icon: 'warning',
            title: 'Escala inválida',
            text: 'Debe haber al menos 2 opciones en la escala Likert'
          });
          return false;
        }

        // 🔥 2. validar labels
        const labelsInvalidos = data.options.some(
          (o: any) => !o.label || o.label.trim() === ''
        );

        if (labelsInvalidos) {
          Swal.fire({
            icon: 'warning',
            title: 'Texto incompleto',
            text: 'Todas las opciones deben tener etiqueta'
          });
          return false;
        }

        // 🔥 3. validar valores secuenciales (1..n)
        const valoresInvalidos = data.options.some(
          (o: any, i: number) => o.value !== i + 1
        );

        if (valoresInvalidos) {
          Swal.fire({
            icon: 'warning',
            title: 'Valores inválidos',
            text: 'Los valores deben ser consecutivos (1,2,3...)'
          });
          return false;
        }

        return true;
      }

      case 12: { // 🔥 SEMANTIC DIFFERENTIAL

  const data = config?.dataSchema ?? config;

  // 🔥 1. validar escala
  if (!data?.scale || data.scale < 2) {
    Swal.fire({
      icon: 'warning',
      title: 'Escala inválida',
      text: 'La escala debe ser al menos de 2 niveles'
    });
    return false;
  }

  // 🔥 2. validar items
  if (!data?.items || data.items.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Sin ítems',
      text: 'Debe agregar al menos un ítem'
    });
    return false;
  }

  // 🔥 3. validar textos
  const invalidItems = data.items.some((i: any) =>
    !i.left || i.left.trim() === '' ||
    !i.right || i.right.trim() === ''
  );

  if (invalidItems) {
    Swal.fire({
      icon: 'warning',
      title: 'Texto incompleto',
      text: 'Todos los ítems deben tener texto en ambos lados'
    });
    return false;
  }

  return true;
}

case 13: { // 🔥 RATING

  const data = config?.dataSchema ?? config;

  // 🔥 1. validar min/max
  if (data?.min === undefined || data?.max === undefined) {
    Swal.fire({
      icon: 'warning',
      title: 'Configuración incompleta',
      text: 'Debe definir mínimo y máximo'
    });
    return false;
  }

  if (data.min >= data.max) {
    Swal.fire({
      icon: 'warning',
      title: 'Rango inválido',
      text: 'El valor mínimo debe ser menor que el máximo'
    });
    return false;
  }

  // 🔥 2. validar labels
  if (!data?.labels?.minLabel || !data?.labels?.maxLabel) {
    Swal.fire({
      icon: 'warning',
      title: 'Etiquetas incompletas',
      text: 'Debe definir etiquetas mínima y máxima'
    });
    return false;
  }

  // 🔥 3. validar tipo vista
  const tiposValidos = ['rating-scale', 'stars', 'slider'];

  if (!tiposValidos.includes(data.widget)) {
    Swal.fire({
      icon: 'warning',
      title: 'Tipo inválido',
      text: 'Tipo de vista no válido'
    });
    return false;
  }

  return true;
}

case 14:
case 15: {

  const data = config?.dataSchema;

  if (!data) {
    Swal.fire({
      icon: 'warning',
      title: 'Configuración requerida',
      text: 'Debes configurar la pregunta'
    });

    return false;
  }

  const respuesta = data?.properties?.respuesta;

  if (!respuesta) {
    Swal.fire({
      icon: 'warning',
      title: 'Respuesta requerida',
      text: 'No existe configuración de respuesta'
    });

    return false;
  }

  if (
    respuesta.minLength &&
    respuesta.maxLength &&
    respuesta.maxLength <= respuesta.minLength
  ) {
    Swal.fire({
      icon: 'warning',
      title: 'Longitud inválida',
      text: 'La longitud máxima debe ser mayor a la mínima'
    });

    return false;
  }

  return true;
}



case 16: { // 🔥 STRUCTURED TEXT

  const data = config?.dataSchema ?? config;

  const respuesta = data?.properties?.respuesta;

  if (!respuesta) {
    Swal.fire({
      icon: 'warning',
      title: 'Configuración inválida',
      text: 'Debe existir la propiedad respuesta'
    });
    return false;
  }

  // 🔥 min/max
  if (respuesta.minLength < 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Mínimo inválido',
      text: 'El mínimo no puede ser negativo'
    });
    return false;
  }

  if (respuesta.maxLength <= respuesta.minLength) {
    Swal.fire({
      icon: 'warning',
      title: 'Rango inválido',
      text: 'El máximo debe ser mayor al mínimo'
    });
    return false;
  }

  return true;
}

case 17: { // 🔥 NUMERIC

  const data = config?.dataSchema ?? config;

  if (data?.type !== 'number') {
    Swal.fire({
      icon: 'warning',
      title: 'Tipo inválido',
      text: 'El tipo debe ser numérico'
    });
    return false;
  }

  if (data?.correctAnswer === null || data?.correctAnswer === undefined) {
    Swal.fire({
      icon: 'warning',
      title: 'Falta respuesta',
      text: 'Debe ingresar la respuesta correcta'
    });
    return false;
  }

  if (isNaN(Number(data.correctAnswer))) {
    Swal.fire({
      icon: 'warning',
      title: 'Valor inválido',
      text: 'La respuesta debe ser un número válido'
    });
    return false;
  }

  return true;
}

case 18: {

  const data = config?.dataSchema ?? config;
  const range = data?.correctRange;

  if (!range) {
    Swal.fire({
      icon: 'warning',
      title: 'Configuración incompleta',
      text: 'Debe definir el rango'
    });
    return false;
  }

  if (range.min === null || range.min === undefined) {
    Swal.fire({
      icon: 'warning',
      title: 'Falta mínimo',
      text: 'Debe ingresar el valor mínimo'
    });
    return false;
  }

  if (range.max === null || range.max === undefined) {
    Swal.fire({
      icon: 'warning',
      title: 'Falta máximo',
      text: 'Debe ingresar el valor máximo'
    });
    return false;
  }

  if (isNaN(Number(range.min)) || isNaN(Number(range.max))) {
    Swal.fire({
      icon: 'warning',
      title: 'Valores inválidos',
      text: 'El rango debe ser numérico'
    });
    return false;
  }

  if (Number(range.min) > Number(range.max)) {
    Swal.fire({
      icon: 'warning',
      title: 'Rango inválido',
      text: 'El mínimo no puede ser mayor al máximo'
    });
    return false;
  }

  return true;
}

case 19: {

  const data = config?.dataSchema ?? config;
  const opciones = data?.properties?.options?.default;

  if (!opciones || opciones.length < 2) {
    Swal.fire({
      icon: 'warning',
      title: 'Opciones insuficientes',
      text: 'Debe haber al menos 2 opciones'
    });
    return false;
  }

  const invalida = opciones.some((o: any) =>
    !o.text || o.text.trim() === ''
  );

  if (invalida) {
    Swal.fire({
      icon: 'warning',
      title: 'Texto incompleto',
      text: 'Todas las opciones deben tener texto'
    });
    return false;
  }

  const scoreInvalido = opciones.some((o: any) =>
    isNaN(Number(o.score))
  );

  if (scoreInvalido) {
    Swal.fire({
      icon: 'warning',
      title: 'Score inválido',
      text: 'Todos los scores deben ser numéricos'
    });
    return false;
  }

  return true;
}

case 20: {

  const data = config?.dataSchema ?? config;
  const respuesta = data?.properties?.respuesta;
  const meta = data?.metadata;

  if (!respuesta) {
    Swal.fire('Error', 'Estructura inválida', 'warning');
    return false;
  }

  // 🔥 FIX: ahora viene de properties.respuesta
  if (!respuesta.minLength || !respuesta.maxLength) {
    Swal.fire('Error', 'Debe definir mínimo y máximo', 'warning');
    return false;
  }

  if (respuesta.minLength >= respuesta.maxLength) {
    Swal.fire('Error', 'El mínimo debe ser menor al máximo', 'warning');
    return false;
  }

  if (!meta) {
    Swal.fire('Error', 'Metadata requerida', 'warning');
    return false;
  }

  const keywordsInvalid = meta.keywords?.some((k: string) => !k?.trim());

  if (keywordsInvalid) {
    Swal.fire('Error', 'Keywords vacíos', 'warning');
    return false;
  }

  const rubricInvalid = meta.rubric?.some((r: any) =>
    !r.criterio || isNaN(Number(r.puntaje))
  );

  if (rubricInvalid) {
    Swal.fire('Error', 'Rúbrica inválida', 'warning');
    return false;
  }

  return true;
}


case 21: {

  const cfg = config?.dataSchema ?? config;

  const codigoBase = cfg?.codigoBase?.trim?.() ?? '';
  const language = cfg?.language ?? '';

  if (!codigoBase) {

    Swal.fire({
      icon: 'warning',
      title: 'Código requerido',
      text: 'Debes ingresar el código base'
    });

    return false;
  }

  if (!language) {

    Swal.fire({
      icon: 'warning',
      title: 'Lenguaje requerido',
      text: 'Debes seleccionar un lenguaje'
    });

    return false;
  }

  return true;
}

case 22: {

  const cfg = config?.dataSchema ?? config;

  const buggyCode = cfg?.buggyCode?.trim?.() ?? '';
  const language = cfg?.language ?? '';

  if (!buggyCode) {

    Swal.fire({
      icon: 'warning',
      title: 'Código requerido',
      text: 'Debes ingresar el código con errores'
    });

    return false;
  }

  if (!language) {

    Swal.fire({
      icon: 'warning',
      title: 'Lenguaje requerido',
      text: 'Debes seleccionar un lenguaje'
    });

    return false;
  }

  return true;
}

case 23: {

  const cfg = config?.dataSchema ?? config;

  const solutionQuery = cfg?.solutionQuery?.trim?.() ?? '';

  if (!solutionQuery) {

    Swal.fire({
      icon: 'warning',
      title: 'Query requerida',
      text: 'Debes ingresar la query correcta'
    });

    return false;
  }

  return true;
}

case 24: {

  const cfg = config?.dataSchema ?? config;

  const items = cfg?.items ?? [];

  if (items.length < 2) {

    Swal.fire({
      icon: 'warning',
      title: 'Elementos insuficientes',
      text: 'Debes ingresar al menos 2 elementos'
    });

    return false;
  }

  const invalid = items.some((x: string) => !x?.trim());

  if (invalid) {

    Swal.fire({
      icon: 'warning',
      title: 'Elementos incompletos',
      text: 'Todos los elementos deben tener contenido'
    });

    return false;
  }

  return true;
}

case 25: {

  const cfg = config?.dataSchema ?? config;

  const left = cfg?.left ?? [];
  const right = cfg?.right ?? [];

  if (left.length < 2) {

    Swal.fire({
      icon: 'warning',
      title: 'Elementos insuficientes',
      text: 'Debes ingresar al menos 2 pares'
    });

    return false;
  }

  const invalidLeft = left.some((x: string) => !x?.trim());

  if (invalidLeft) {

    Swal.fire({
      icon: 'warning',
      title: 'Columna A incompleta',
      text: 'Todos los elementos de la columna A deben tener contenido'
    });

    return false;
  }

  const invalidRight = right.some((x: string) => !x?.trim());

  if (invalidRight) {

    Swal.fire({
      icon: 'warning',
      title: 'Columna B incompleta',
      text: 'Todos los elementos de la columna B deben tener contenido'
    });

    return false;
  }

  return true;
}

case 26: {

  const cfg = config?.dataSchema ?? config;

  const items = cfg?.items ?? [];

  if (items.length < 2) {

    Swal.fire({
      icon: 'warning',
      title: 'Elementos insuficientes',
      text: 'Debes ingresar al menos 2 elementos'
    });

    return false;
  }

  const invalid = items.some(
    (x: any) => !x?.text?.trim()
  );

  if (invalid) {

    Swal.fire({
      icon: 'warning',
      title: 'Elementos incompletos',
      text: 'Todos los elementos deben tener contenido'
    });

    return false;
  }

  return true;
}


case 27: {

  const cfg = config?.dataSchema ?? config;

  const left = cfg?.left ?? [];
  const right = cfg?.right ?? [];

  if (left.length < 2) {

    Swal.fire({
      icon: 'warning',
      title: 'Pares insuficientes',
      text: 'Debes ingresar al menos 2 pares'
    });

    return false;
  }

  const invalidLeft = left.some(
    (x: any) => !x?.text?.trim()
  );

  if (invalidLeft) {

    Swal.fire({
      icon: 'warning',
      title: 'Columna A incompleta',
      text: 'Todos los elementos de la columna A deben tener contenido'
    });

    return false;
  }

  const invalidRight = right.some(
    (x: any) => !x?.text?.trim()
  );

  if (invalidRight) {

    Swal.fire({
      icon: 'warning',
      title: 'Opciones incompletas',
      text: 'Todas las opciones deben tener contenido'
    });

    return false;
  }

  return true;
}


case 28: {

  const data =
    config?.dataSchema?.default;

  if (!data) {

    Swal.fire({
      icon: 'warning',
      title: 'Configuración incompleta',
      text: 'No existe configuración del patrón'
    });

    return false;
  }

  // =========================
  // PATRÓN
  // =========================
  if (
    !data.pattern ||
    data.pattern.length < 3
  ) {

    Swal.fire({
      icon: 'warning',
      title: 'Patrón inválido',
      text: 'Debes ingresar al menos 3 elementos en el patrón'
    });

    return false;
  }

  // =========================
  // VALIDAR ?
  // =========================
  const questionCount =
    data.pattern.filter(
      (x: string) => x === '?'
    ).length;

  if (questionCount !== 1) {

    Swal.fire({
      icon: 'warning',
      title: 'Patrón inválido',
      text: 'Debe existir una sola incógnita (?)'
    });

    return false;
  }

  // =========================
  // OPCIONES
  // =========================
  if (
    !data.options ||
    data.options.length < 2
  ) {

    Swal.fire({
      icon: 'warning',
      title: 'Opciones inválidas',
      text: 'Debes ingresar al menos 2 opciones'
    });

    return false;
  }

  // =========================
  // OPCIÓN VACÍA
  // =========================
  const hasEmptyOption =
    data.options.some(
      (x: string) =>
        !x || !x.trim()
    );

  if (hasEmptyOption) {

    Swal.fire({
      icon: 'warning',
      title: 'Opciones inválidas',
      text: 'No puede haber opciones vacías'
    });

    return false;
  }

  // =========================
  // CORRECTA
  // =========================
  if (
    data.correctIndex == null ||
    data.correctIndex < 0 ||
    data.correctIndex >= data.options.length
  ) {

    Swal.fire({
      icon: 'warning',
      title: 'Respuesta correcta inválida',
      text: 'Debes seleccionar una respuesta correcta'
    });

    return false;
  }

  return true;
}


case 29: {

  const data = config?.dataSchema;

  if (!data) {

    Swal.fire({
      icon: 'warning',
      title: 'Configuración requerida',
      text: 'No existe configuración de la matriz'
    });

    return false;
  }

  // MATRIZ
  if (!data?.matrix || !Array.isArray(data.matrix)) {

    Swal.fire({
      icon: 'warning',
      title: 'Matriz requerida',
      text: 'Debes configurar la matriz'
    });

    return false;
  }

  // INCÓGNITAS
  if (
    !data?.missingPositions ||
    !Array.isArray(data.missingPositions) ||
    data.missingPositions.length === 0
  ) {

    Swal.fire({
      icon: 'warning',
      title: 'Incógnitas requeridas',
      text: 'Debes marcar al menos una incógnita'
    });

    return false;
  }

  // RESPUESTAS
  if (
    !data?.answers ||
    !Array.isArray(data.answers) ||
    data.answers.length === 0
  ) {

    Swal.fire({
      icon: 'warning',
      title: 'Respuestas requeridas',
      text: 'Debes definir las respuestas'
    });

    return false;
  }

  // VALIDAR RESPUESTAS VACÍAS
  const invalidAnswers = data.answers.some(
    (a: any) =>
      a.value === null ||
      a.value === undefined ||
      a.value === ''
  );

  if (invalidAnswers) {

    Swal.fire({
      icon: 'warning',
      title: 'Respuesta incompleta',
      text: 'Todas las incógnitas deben tener respuesta'
    });

    return false;
  }

  return true;
}


      // =========================
      default:
        return true;
    }
  }

  //#endregion
}
