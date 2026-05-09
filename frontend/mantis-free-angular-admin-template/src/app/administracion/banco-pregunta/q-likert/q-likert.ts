import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LikertOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-q-likert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-likert.html',
  styleUrl: './q-likert.scss'
})
export class QLikert implements OnInit, OnChanges {

  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();

  opciones: LikertOption[] = [];

  private isLoading = false;

  // =========================
  // INIT (🔥 SI NO HAY CONFIG)
  // =========================
  ngOnInit() {

    if (!this.config) {
      this.setDefault();
      this.emitir();
    }
  }

  // =========================
  // CHANGES (🔥 SI HAY CONFIG)
  // =========================
  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && this.config) {
      this.loadFromParent();
    }
  }

  // =========================
  // DEFAULT
  // =========================
  setDefault() {

    this.opciones = [
      { value: 1, label: 'Muy malo' },
      { value: 2, label: 'Malo' },
      { value: 3, label: 'Regular' },
      { value: 4, label: 'Bueno' },
      { value: 5, label: 'Excelente' }
    ];
  }

  // =========================
  // LOAD
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    if (cfg?.options?.length) {
      this.opciones = cfg.options.map((o: any, index: number) => ({
        value: o.value ?? index + 1,
        label: o.label ?? ''
      }));
    } else {
      // 🔥 fallback si viene mal
      this.setDefault();
    }

    Promise.resolve().then(() => {
      this.isLoading = false;
      this.emitir(); // 🔥 EMITE UNA VEZ
    });
  }

  // =========================
  // CRUD
  // =========================
  agregar() {

    const nextValue = this.opciones.length + 1;

    this.opciones = [
      ...this.opciones,
      { value: nextValue, label: `Opción ${nextValue}` }
    ];

    this.emitir();
  }

  eliminar(index: number) {

    this.opciones = this.opciones
      .filter((_, i) => i !== index)
      .map((o, i) => ({
        ...o,
        value: i + 1
      }));

    this.emitir();
  }

  actualizar() {
    this.emitir();
  }

  trackById(index: number, item: any) {
    return item.value;
  }

  // =========================
  // EMIT
  // =========================
  private emitir() {

    if (this.isLoading) return;

    const payload = {
      dataSchema: {
        type: 'likert',
        options: this.opciones.map(o => ({
          value: o.value,
          label: o.label
        }))
      },
      uiSchema: {
        options: {
          'ui:widget': 'likert-scale'
        }
      }
    };

    console.log('EMIT LIKERT', payload);

    this.valueChange.emit(payload);
  }
}
