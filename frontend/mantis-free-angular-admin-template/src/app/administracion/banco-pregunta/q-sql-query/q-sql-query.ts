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
  selector: 'app-q-sql-query',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-sql-query.html',
  styleUrl: './q-sql-query.scss'
})
export class QSqlQuery implements OnInit, OnChanges {

  //#region INPUT / OUTPUT
  @Input() config: any;

  @Output() valueChange = new EventEmitter<any>();
  //#endregion

  //#region STATE
  baseQuery = '';

  solutionQuery = '';
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

    this.baseQuery = '';

    this.solutionQuery = '';
  }

  // =========================
  // LOAD FROM PARENT
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.baseQuery = cfg?.baseQuery ?? '';

    this.solutionQuery = cfg?.solutionQuery ?? '';

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

        language: 'sql',

        baseQuery: this.baseQuery,

        solutionQuery: this.solutionQuery,

        properties: {

          respuesta: {
            type: 'string'
          }
        },

        metadata: {
          mode: 'sql-query'
        }
      },

      uiSchema: {

        respuesta: {
          'ui:widget': 'sql-query'
        },

        options: {
          language: 'sql'
        }
      }
    };

    this.lastEmittedConfig = JSON.stringify(payload);

    this.valueChange.emit(payload);
  }
}
