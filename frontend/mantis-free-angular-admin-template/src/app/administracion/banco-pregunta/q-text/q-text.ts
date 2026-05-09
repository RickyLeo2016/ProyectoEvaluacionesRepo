
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
  selector: 'app-q-text',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-text.html',
  styleUrl: './q-text.scss'
})
export class QText implements OnInit, OnChanges {

  //#region INPUTS / OUTPUTS
  @Input() questionType!: number; // 14 short | 15 long
  @Input() config: any;

  @Output() valueChange = new EventEmitter<any>();
  //#endregion

  //#region STATE

  placeholder = 'Escribe tu respuesta...';

  required = true;

  minLength = 1;
  maxLength = 120;

  rows = 5;

  //#endregion

  //#region CONTROL

  private isLoading = false;
  private lastEmittedConfig = '';

  //#endregion

  //#region LIFECYCLE

  ngOnInit(): void {

    if (!this.config) {

      this.setDefaults();

      this.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['config'] && this.config) {

      const incoming = JSON.stringify(this.config);

      if (incoming === this.lastEmittedConfig) {
        return;
      }

      this.loadFromParent();
    }
  }

  //#endregion

  //#region HELPERS

  isLongText(): boolean {
    return this.questionType === 15;
  }

  //#endregion

  //#region DEFAULTS

  setDefaults() {

    if (this.isLongText()) {

      this.minLength = 10;
      this.maxLength = 2000;
      this.rows = 6;

      this.placeholder = 'Escribe una respuesta detallada...';

    } else {

      this.minLength = 1;
      this.maxLength = 120;
      this.rows = 1;

      this.placeholder = 'Escribe una respuesta corta...';
    }
  }

  //#endregion

  //#region LOAD

  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    const respuesta = cfg?.properties?.respuesta ?? {};
    const metadata = cfg?.metadata ?? {};

    this.minLength = respuesta?.minLength ?? 1;

    this.maxLength =
      respuesta?.maxLength ??
      (this.isLongText() ? 2000 : 120);

    this.required =
      cfg?.required?.includes('respuesta') ?? true;

    this.placeholder =
      metadata?.placeholder ??
      (this.isLongText()
        ? 'Escribe una respuesta detallada...'
        : 'Escribe una respuesta corta...');

    this.rows =
      metadata?.rows ??
      (this.isLongText() ? 6 : 1);

    if (this.maxLength <= this.minLength) {
      this.maxLength = this.minLength + 1;
    }

    Promise.resolve().then(() => {

      this.isLoading = false;

      this.emit();
    });
  }

  //#endregion

  //#region EVENTS

  onChange() {

    if (this.isLoading) return;

    if (this.maxLength <= this.minLength) {
      this.maxLength = this.minLength + 1;
    }

    this.emit();
  }

  //#endregion

  //#region EMIT

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
        },

        required: this.required
          ? ['respuesta']
          : [],

        metadata: {
          placeholder: this.placeholder,
          rows: this.rows,
          mode: this.isLongText()
            ? 'text-long'
            : 'text-short'
        }
      },

      uiSchema: {
        respuesta: {

          'ui:widget': this.isLongText()
            ? 'textarea'
            : 'text',

          'ui:placeholder': this.placeholder,

          'ui:options': {
            rows: this.rows
          }
        }
      }
    };

    this.lastEmittedConfig = JSON.stringify(payload);

    this.valueChange.emit(payload);
  }

  //#endregion
}
