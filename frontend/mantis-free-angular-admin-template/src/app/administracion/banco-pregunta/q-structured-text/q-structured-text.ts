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
  selector: 'app-q-structured-text',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-structured-text.html'
})
export class QStructuredText implements OnInit, OnChanges {

  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();

  // =========================
  // STATE
  // =========================
  minLength = 0;
  maxLength = 300;
  placeholder = 'Ingrese su respuesta';
  multiline = true;

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
    this.minLength = 0;
    this.maxLength = 300;
    this.placeholder = 'Ingrese su respuesta';
    this.multiline = true;
  }

  // =========================
  // LOAD
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;
    const ui = this.config?.uiSchema ?? {};

    const respuesta = cfg?.properties?.respuesta;

    if (respuesta) {
      this.minLength = Number(respuesta.minLength ?? 0);
      this.maxLength = Number(respuesta.maxLength ?? 300);
    }

    const uiResp = ui?.respuesta;

    if (uiResp) {
      this.placeholder = uiResp['ui:placeholder'] ?? this.placeholder;
      this.multiline = uiResp['ui:widget'] === 'textarea';
    }

    if (this.maxLength <= this.minLength) {
      this.maxLength = this.minLength + 1;
    }

    Promise.resolve().then(() => {
      this.isLoading = false;
      this.emit(); // 🔥 CLAVE
    });
  }

  // =========================
  // CHANGE
  // =========================
  onChange() {

    if (this.isLoading) return;

    if (this.maxLength <= this.minLength) {
      this.maxLength = this.minLength + 1;
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
        type: 'object',
        properties: {
          respuesta: {
            type: 'string',
            minLength: this.minLength,
            maxLength: this.maxLength
          }
        }
      },
      uiSchema: {
        respuesta: {
          'ui:widget': this.multiline ? 'textarea' : 'text',
          'ui:placeholder': this.placeholder
        }
      }
    };

    this.valueChange.emit(payload);
  }
}
