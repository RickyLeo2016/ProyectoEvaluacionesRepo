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
  selector: 'app-q-code-fix',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-code-fix.html',
  styleUrl: './q-code-fix.scss'
})
export class QCodeFix implements OnInit, OnChanges {

  //#region INPUT / OUTPUT
  @Input() config: any;

  @Output() valueChange = new EventEmitter<any>();
  //#endregion

  //#region STATE
  buggyCode = '';

  language = 'javascript';

  lenguajes = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'csharp', label: 'C#' },
    { value: 'sql', label: 'SQL' }
  ];
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

    this.buggyCode = '';

    this.language = 'javascript';
  }

  // =========================
  // LOAD FROM PARENT
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.buggyCode = cfg?.buggyCode ?? '';

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

        buggyCode: this.buggyCode,

        language: this.language,

        properties: {

          respuesta: {
            type: 'string'
          }
        },

        metadata: {
          mode: 'fix-code'
        }
      },

      uiSchema: {

        respuesta: {
          'ui:widget': 'code-fix'
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
