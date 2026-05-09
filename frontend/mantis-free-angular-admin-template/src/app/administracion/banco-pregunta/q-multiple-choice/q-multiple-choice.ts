import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Opcion {
  id: string;
  text: string;
}

@Component({
  selector: 'app-q-multiple-choice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-multiple-choice.html',
  styleUrl: './q-multiple-choice.scss'
})
export class QMultipleChoice implements OnChanges {

  @Input() multiple: boolean = false;
  @Input() config: any;

  @Output() valueChange = new EventEmitter<any>();

  opciones: Opcion[] = [];
  correcta: number | number[] | null = null;

  // 🔥 control anti-loop
  private lastEmittedConfig = '';

  private initialized = false;
  private emittingFromLoad = false;

  // =========================
  // LOAD FROM PADRE / BD
  // =========================
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['config'] && this.config && !this.initialized) {
      this.loadFromParent();
      this.initialized = true;
    }
  }

  loadFromParent() {

    const cfg = this.config?.dataSchema ?? this.config;

    this.opciones = (cfg.options || []).map((o: any) => ({
      id: crypto.randomUUID(),
      text: o.text || ''
    }));

    if (this.multiple) {
      this.correcta = Array.isArray(cfg.correctAnswer)
        ? [...cfg.correctAnswer]
        : [];
    } else {
      this.correcta = typeof cfg.correctAnswer === 'number'
        ? cfg.correctAnswer
        : null;
    }

    // 🔥 emitir SOLO UNA VEZ al cargar
    this.emittingFromLoad = true;

    Promise.resolve().then(() => {
      this.emitir();
      this.emittingFromLoad = false;
    });
  }

  // =========================
  // UI
  // =========================
  agregarOpcion() {

    this.opciones = [
      ...this.opciones,
      { id: crypto.randomUUID(), text: '' }
    ];

    this.emitir();
  }

  eliminarOpcion(index: number) {

    this.opciones = this.opciones.filter((_, i) => i !== index);

    if (!this.multiple) {

      if (this.correcta === index) this.correcta = null;

      if (typeof this.correcta === 'number' && this.correcta > index) {
        this.correcta--;
      }

    } else {

      if (Array.isArray(this.correcta)) {
        this.correcta = this.correcta
          .filter(i => i !== index)
          .map(i => i > index ? i - 1 : i);
      }
    }

    this.emitir();
  }

  seleccionarRadio(index: number) {
    this.correcta = index;
    this.emitir();
  }

  toggleCheckbox(index: number) {

    if (!Array.isArray(this.correcta)) {
      this.correcta = [];
    }

    const arr = this.correcta as number[];

    this.correcta = arr.includes(index)
      ? arr.filter(i => i !== index)
      : [...arr, index];

    this.emitir();
  }

  esSeleccionado(index: number): boolean {

    if (this.multiple) {
      return Array.isArray(this.correcta) && this.correcta.includes(index);
    }

    return this.correcta === index;
  }

  // =========================
  // EMIT (INDEX BASED)
  // =========================
  emitir() {

    // 🔥 evita doble emisión por Angular change detection
    if (this.emittingFromLoad && !this.initialized) return;

    const payload = {
      dataSchema: {
        type: this.multiple ? 'multiple_select' : 'multiple_choice',
        options: this.opciones.map((o, index) => ({
          text: o.text,
          value: index
        })),
        correctAnswer: this.correcta
      },
      uiSchema: {
        options: {
          'ui:widget': this.multiple ? 'checkbox-list' : 'radio-list'
        }
      }
    };

    this.valueChange.emit(payload);
  }
  trackById(_: number, item: Opcion) {
    return item.id;
  }
}
