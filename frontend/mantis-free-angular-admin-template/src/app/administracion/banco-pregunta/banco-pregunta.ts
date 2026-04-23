import { Component, OnInit, signal, computed } from '@angular/core';
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

// Componentes hijos
import { QTrueFalse } from './q-true-false/q-true-false';
import { QMultipleChoice } from './q-multiple-choice/q-multiple-choice';
import { QCode } from './q-code/q-code';

export interface IBancoPregunta {
  banPreId?: number;
  banPreVerId?: number;
  catIdTipo: number;
  tipoPreguntaDesc?: string;
  banPreVerPuntaje: number;
  banPreVerEnunciado: string;
  banPreVerDataSchema: string;
  banPreVerUiSchema?: string;
}

export interface AccionTabla<T> {
  icon: string;
  color: string;
  callback?: (item: T) => void;
  title?: string;
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
    QMultipleChoice,
    QTrueFalse,
    QCode
  ],
  templateUrl: './banco-pregunta.html',
})
export class BancoPregunta implements OnInit {

  //#region 🔹 STATE GENERAL
  spinnerVisible = signal(false);

  tiposPregunta = signal<any[]>([]);
  tipoSeleccionado = signal<number | null>(null);

  codeConfig: any = null;


  modoFormulario = signal(false);
  modoEdicion = signal(false);

  pregunta = signal('');
  descripcion = signal('');

  puntajeInput = signal('');
  puntaje = signal<number>(0);

  //#endregion

  //#region 🔹 STATE TIPOS (DINÁMICOS)
  trueFalseConfig: any = null;

  opciones = signal<string[]>([]);
  respuestaCorrecta = signal<any>(null);
  //#endregion



  //#region 🔹 DATA TABLE (NO TOCAR)
  bancoPregunta = signal<IBancoPregunta[]>([]);

  filtro = signal('');
  tiposFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.bancoPregunta();
    return this.bancoPregunta().filter(t =>
      t.banPreVerEnunciado?.toLowerCase().includes(f)
    );
  });

  accionesTabla: AccionTabla<IBancoPregunta>[] = [
    {
      icon: 'fas fa-code-branch',
      title: 'Nueva versión',
      color: '#f39c12',
      callback: (item) => this.crearVersion(item)
    }
  ];

  columnas = [
    { header: 'ID', field: 'banPreId' },
    { header: 'Pregunta', field: 'banPreVerEnunciado' },
    { header: 'Puntaje', field: 'banPreVerPuntaje' },
    { header: 'Versión', field: 'banPreVerNumero' },
    { header: 'Acciones', field: 'acciones' }
  ];
  //#endregion

  constructor(
    private catService: CatalogoService,
    private bancoPreguntaService: BancoPreguntaService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarTipos();
    this.cargarListaBancoPregunta();
  }

  //#region 🔹 LOAD
  cargarTipos() {
    this.catService.obtenerCatalogoPorTipo(4).subscribe(res => {
      if (res.isSuccess) this.tiposPregunta.set(res.data);
    });
  }

  cargarListaBancoPregunta() {
    this.spinnerVisible.set(true);
    this.bancoPreguntaService.listarBancoPregunta().subscribe({
      next: res => {
        if (res.isSuccess) this.bancoPregunta.set(res.data);
        this.spinnerVisible.set(false);
      },
      error: () => {
        this.spinnerVisible.set(false);
        this.auth.logout();
      }
    });
  }
  //#endregion

  //#region 🔹 UI
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
    this.pregunta.set('');
    this.puntaje.set(1);
    this.tipoSeleccionado.set(null);
    this.trueFalseConfig = null;


  }
  //#endregion

  //#region 🔹 TABLA
  crearVersion(item: IBancoPregunta) {
    console.log('Crear nueva versión de:', item);
    Swal.fire('Info', 'Funcionalidad en construcción', 'info');
  }
  //#endregion

  //#region 🔹 CHANGE
  onTipoPreguntaChange(event: Event) {
    const raw = (event.target as HTMLSelectElement).value;
    const value = raw ? Number(raw) : null;

    this.tipoSeleccionado.set(value);

    if (!value) return;

    const tipo = this.tiposPregunta().find(t => t.catId === value);
    this.descripcion.set(tipo?.catDescripcion || '');
  }
  //#endregion

  //#region 🔹 PUNTAJE
  onPuntajeInput(event: Event) {
    let val = (event.target as HTMLInputElement).value;
    val = val.replace(/[^0-9,]/g, '');

    const partes = val.split(',');
    if (partes.length > 2) val = partes[0] + ',' + partes[1];

    if (partes[1]) {
      partes[1] = partes[1].slice(0, 2);
      val = partes[0] + ',' + partes[1];
    }

    partes[0] = partes[0].slice(0, 2);
    val = partes.join(',');

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

  //#region 🔹 EVENTOS HIJOS
  onTrueFalseChange(data: any) {
    this.trueFalseConfig = data;
  }

  onMultipleChange(data: any) {
    this.opciones.set(data.opciones);
    this.respuestaCorrecta.set(data.correcta);
  }

  onCodeChange(data: any) {
    this.codeConfig = data;
  }



  //#endregion

  //#region 🔹 BUILD SCHEMA
  buildDataSchema() {
    switch (this.tipoSeleccionado()) {

      case 10:
        if (!this.trueFalseConfig) return {};

        return {
          type: 'true_false',
          options: [
            {
              text: this.trueFalseConfig.labels?.true || 'Verdadero',
              value: true,
              isCorrect: this.trueFalseConfig.respuesta === true
            },
            {
              text: this.trueFalseConfig.labels?.false || 'Falso',
              value: false,
              isCorrect: this.trueFalseConfig.respuesta === false
            }
          ]
        };
      case 14:
      case 14:
      case 15:
        return {
          type: 'text'
        };



      case 21:
        return {
          codigoBase: this.codeConfig?.codigoBase || '',
          language: this.codeConfig?.lenguaje || 'javascript'
      };




      default:
        return {};
    }
  }

  buildUiSchema() {
    switch (this.tipoSeleccionado()) {

      case 10:
        return {
          options: { 'ui:widget': 'radio' }
        };
      case 14:
      case 15:
        return {};

      case 21:
        return {
          widget: 'code-editor'
        };
      default:
        return {};
    }
  }
  //#endregion

  //#region 🔹 VALIDACIÓN
  validarSchema(): boolean {

    try {

      const tipo = this.tipoSeleccionado();
      const schema = this.buildDataSchema();

      // 🔴 Validación base
      if (!schema || Object.keys(schema).length === 0) {
        Swal.fire('Error', 'Configuración incompleta', 'warning');
        return false;
      }

      // =========================
      // 🔹 VALIDACIONES POR TIPO
      // =========================

      switch (tipo) {

        // 🔹 TRUE / FALSE
        case 10:
          if (!this.trueFalseConfig) {
            Swal.fire('Error', 'Debe configurar la respuesta', 'warning');
            return false;
          }
          break;

        // 🔹 TEXT SHORT / LONG
        case 14:
        case 15:
          // ✔ no se valida nada
          break;

      }

      return true;

    } catch (error) {

      console.error(error);

      Swal.fire('Error', 'Schema inválido', 'error');
      return false;
    }
  }
  //#endregion

  //#region 🔹 GUARDAR
  guardar() {

    if (!this.pregunta()) {
      Swal.fire('Error', 'El enunciado es obligatorio', 'warning');
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


    if (!this.codeConfig?.codigoBase?.trim()) {
      Swal.fire('Error', 'Debe ingresar el código', 'warning');
      return;
    }

    if (!this.validarSchema()) return;

    const payload = {
      catIdTipo: this.tipoSeleccionado()!,
      banPreVerPuntaje: this.puntaje(),
      banPreVerEnunciado: this.pregunta(),
      banPreVerDataSchema: JSON.stringify(this.buildDataSchema()),
      banPreVerUiSchema: JSON.stringify(this.buildUiSchema())
    };

    this.spinnerVisible.set(true);

    this.bancoPreguntaService.crear(payload).subscribe({
      next: res => {
        this.spinnerVisible.set(false);

        if (res.isSuccess) {
          Swal.fire('OK', 'Pregunta creada correctamente', 'success');
          this.cargarListaBancoPregunta();
          this.cancelarFormulario();
        } else {
          console.error(res.errors);
          Swal.fire('Error', res.message || 'Error al guardar', 'error');
        }
      },
      error: () => {
        this.spinnerVisible.set(false);
        Swal.fire('Error', 'Error del servidor', 'error');
      }
    });
  }
  //#endregion
}
