
import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OpcionSJ {
  id: string;
  text: string;
  score: number;
}

@Component({
  selector: 'app-q-situational-judgment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-situational-judgment.html',
  styleUrl: './q-situational-judgment.scss'
})
export class QSituationalJudgment implements OnInit, OnChanges {

  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();

  opciones: OpcionSJ[] = [];

  private isLoading = false;
  private lastEmittedConfig = '';

  // =========================
  // INIT
  // =========================
  ngOnInit() {
    if (!this.config) {
      this.setDefault();
      this.emit();
    }
  }

  // =========================
  // CHANGES
  // =========================
  ngOnChanges(changes: SimpleChanges) {

  if (changes['config'] && this.config) {

    const incoming = JSON.stringify(this.config);

    // 🔥 si es igual a lo que emitimos → ignorar
    if (incoming === this.lastEmittedConfig) return;

    this.loadFromParent();
  }
}

  // =========================
  // DEFAULT
  // =========================
  setDefault() {
    this.opciones = [
      { id: crypto.randomUUID(), text: '', score: 0 },
      { id: crypto.randomUUID(), text: '', score: 0 }
    ];
  }

  // =========================
  // LOAD FROM PARENT
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;
    const options = cfg?.properties?.options?.default ?? [];

    this.opciones = options.map((o: any) => ({
      id: crypto.randomUUID(), // 🔥 clave para trackBy
      text: o.text ?? '',
      score: Number(o.score ?? 0)
    }));

    if (this.opciones.length < 2) {
      this.setDefault();
    }

    Promise.resolve().then(() => {
      this.isLoading = false;
      this.emit(); // 🔥 importante para edición sin tocar
    });
  }

  // =========================
  // ADD
  // =========================
  add() {
    this.opciones.push({
      id: crypto.randomUUID(),
      text: '',
      score: 0
    });

    this.emit();
  }

  // =========================
  // REMOVE
  // =========================
  remove(i: number) {

    this.opciones.splice(i, 1);

    if (this.opciones.length < 2) {
      this.setDefault();
    }

    this.emit();
  }

  // =========================
  // CHANGE
  // =========================
  onChange() {

    if (this.isLoading) return;

    this.emit();
  }

  // =========================
  // TRACKBY 🔥
  // =========================
  trackById(_: number, item: OpcionSJ) {
    return item.id;
  }

  // =========================
  // EMIT
  // =========================
emit() {

  if (this.isLoading) return;

  const payload = {
    dataSchema: {
      type: 'object',
      properties: {
        respuesta: {
          type: 'number',
          enum: this.opciones.map((_, i) => i)
        },
        options: {
          type: 'array',
          default: this.opciones.map(o => ({
            text: o.text,
            score: o.score
          }))
        }
      }
    },
    uiSchema: {
      options: {
        'ui:widget': 'situational-judgment'
      }
    }
  };

  // 🔥 CLAVE
  this.lastEmittedConfig = JSON.stringify(payload);

  this.valueChange.emit(payload);
}

}
