import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-q-numeric-range',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-numeric-range.html',
  styleUrl: './q-numeric-range.scss'
})
export class QNumericRange implements OnInit, OnChanges {

  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();

  min: number | null = null;
  max: number | null = null;

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
    this.min = null;
    this.max = null;
  }

  // =========================
  // LOAD FROM PARENT
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    const range = cfg?.correctRange;

    this.min = range?.min ?? null;
    this.max = range?.max ?? null;

    // 🔥 regla básica
    if (this.min !== null && this.max !== null && this.min > this.max) {
      this.max = this.min;
    }

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

    // 🔥 auto-fix rango
    if (this.min !== null && this.max !== null && this.min > this.max) {
      this.max = this.min;
    }

    this.emit();
  }

  // =========================
  // EMIT
  // =========================
  emit() {

    if (this.isLoading) return;

    const payload = {
      dataSchema: {
        type: 'numeric_range',
        correctRange: {
          min: this.min,
          max: this.max
        }
      },
      uiSchema: {
        options: {
          'ui:widget': 'range-input',
          'ui:placeholderMin': 'Ingrese mínimo',
          'ui:placeholderMax': 'Ingrese máximo'
        }
      }
    };

    this.valueChange.emit(payload);
  }
}
