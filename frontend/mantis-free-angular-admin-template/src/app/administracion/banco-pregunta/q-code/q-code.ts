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
  selector: 'app-q-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-code.html',
  styleUrl: './q-code.scss'
})
export class QCode implements OnInit, OnChanges {

  //#region INPUTS
  @Input() config: any;

  @Output() valueChange = new EventEmitter<any>();
  //#endregion

  //#region STATE
  codigoBase = '';
  language = 'javascript';
  //#endregion

  //#region CONTROL
  private isLoading = false;
  private lastEmittedConfig = '';
  //#endregion

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {

    if (!this.config) {

      this.setDefault();
      this.emit();
    }
  }

  // =========================
  // CHANGES
  // =========================
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['config'] && this.config) {

      const incoming = JSON.stringify(this.config);

      if (incoming === this.lastEmittedConfig) {
        return;
      }

      this.loadFromParent();
    }
  }

  // =========================
  // DEFAULT
  // =========================
  setDefault() {

    this.codigoBase = '';
    this.language = 'javascript';
  }

  // =========================
  // LOAD FROM PARENT
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.codigoBase = cfg?.codigoBase ?? '';

    this.language =
      cfg?.language ??
      cfg?.lenguaje ??
      'javascript';

    Promise.resolve().then(() => {

      this.isLoading = false;

      // 🔥 importante para edición
      this.emit();
    });
  }

  // =========================
  // CHANGE
  // =========================
  onChange() {

    if (this.isLoading) {
      return;
    }

    this.emit();
  }

  // =========================
  // EMIT
  // =========================
  emit() {

    if (this.isLoading) {
      return;
    }

    const payload = {

      dataSchema: {

        type: 'object',

        codigoBase: this.codigoBase,

        language: this.language,

        properties: {

          respuesta: {
            type: 'string'
          }
        }
      },

      uiSchema: {

        respuesta: {
          'ui:widget': 'code-editor'
        },

        options: {
          language: this.language
        }
      }
    };

    this.lastEmittedConfig = JSON.stringify(payload);

    this.valueChange.emit(payload);
  }
}
