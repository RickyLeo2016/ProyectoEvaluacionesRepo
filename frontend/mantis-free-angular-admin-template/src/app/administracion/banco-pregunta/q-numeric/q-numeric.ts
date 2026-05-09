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

@Component({
  selector: 'app-q-numeric',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-numeric.html',
  styleUrl: './q-numeric.scss'
})
export class QNumeric implements OnInit, OnChanges {

  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();

  // =========================
  // STATE
  // =========================
  valor: number | null = null;

  private isLoading = false;

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
      this.loadFromParent();
    }
  }

  // =========================
  // DEFAULT
  // =========================
  setDefault() {
    this.valor = null;
  }

  // =========================
  // LOAD
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.valor = cfg?.correctAnswer ?? null;

    Promise.resolve().then(() => {
      this.isLoading = false;
      this.emit(); // 🔥 clave para edición sin tocar
    });
  }

  // =========================
  // CHANGE
  // =========================
  onChange() {

    if (this.isLoading) return;

    this.emit();
  }

  // =========================
  // EMIT
  // =========================
  emit() {

    if (this.isLoading) return;

    const payload = {
      dataSchema: {
        type: 'number',
        correctAnswer: this.valor
      },
      uiSchema: {
        options: {
          'ui:widget': 'input',
          'ui:placeholder': 'Ingrese la respuesta numérica'
        }
      }
    };

    this.valueChange.emit(payload);
  }
}
