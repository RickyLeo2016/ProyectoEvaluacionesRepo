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

type PatternType =
  | 'number'
  | 'letter'
  | 'image';

interface PatternItem {
  id: string;
  value: string;
}

@Component({
  selector: 'app-q-pattern-recognition',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-pattern-recognition.html',
  styleUrl: './q-pattern-recognition.scss'
})
export class QPatternRecognition
  implements OnInit, OnChanges {

  //#region INPUT / OUTPUT
  @Input() config: any;

  @Output() valueChange =
    new EventEmitter<any>();
  //#endregion

  //#region STATE
  patternSize = 4;

  patternType: PatternType = 'letter';

  pattern: PatternItem[] = [];

  options: PatternItem[] = [];

  correctIndex = 0;
  //#endregion

  //#region CONTROL
  private isLoading = false;

  private lastEmittedConfig = '';
  //#endregion

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

      const incoming =
        JSON.stringify(this.config);

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

    this.patternSize = 4;

    this.patternType = 'letter';

    this.pattern = [
      {
        id: crypto.randomUUID(),
        value: 'A'
      },
      {
        id: crypto.randomUUID(),
        value: 'B'
      },
      {
        id: crypto.randomUUID(),
        value: 'C'
      },
      {
        id: crypto.randomUUID(),
        value: '?'
      }
    ];

    this.options = [
      {
        id: crypto.randomUUID(),
        value: 'D'
      },
      {
        id: crypto.randomUUID(),
        value: 'E'
      },
      {
        id: crypto.randomUUID(),
        value: 'F'
      }
    ];

    this.correctIndex = 0;
  }

  // =========================
  // LOAD
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg =
      this.config?.dataSchema
      ?? this.config?.default
      ?? this.config;

    this.patternType =
      cfg?.patternType
      ?? 'letter';

    this.patternSize =
      cfg?.patternSize
      ?? 4;

    this.pattern =
      (cfg?.pattern ?? []).map(
        (x: any, i: number) => ({

          id:
            this.pattern[i]?.id
            ?? crypto.randomUUID(),

          value: x ?? ''
        })
      );

    this.options =
      (cfg?.options ?? []).map(
        (x: any, i: number) => ({

          id:
            this.options[i]?.id
            ?? crypto.randomUUID(),

          value: x ?? ''
        })
      );

    this.correctIndex =
      cfg?.correctIndex ?? 0;

    Promise.resolve().then(() => {

      this.isLoading = false;

      this.emit();
    });
  }

  // =========================
  // HELPERS
  // =========================
  isNumericPattern(): boolean {

    return this.pattern
      .filter(x => x.value !== '?')
      .every(x =>
        !isNaN(Number(x.value))
      );
  }

  // =========================
  // EVENTS
  // =========================
  changePatternSize(size: number) {

    this.patternSize = Number(size);

    const oldPattern = [...this.pattern];

    this.pattern = Array.from(
      { length: this.patternSize },
      (_, i) => {

        let value =
          oldPattern[i]?.value ?? '';

        // 🔥 eliminar ? anteriores
        if (value === '?') {
          value = '';
        }

        return {

          id:
            oldPattern[i]?.id
            ?? crypto.randomUUID(),

          value
        };
      }
    );

    // 🔥 SOLO el último es ?
    this.pattern[
      this.pattern.length - 1
    ].value = '?';

    this.emit();
  }

  changeType(type: PatternType) {

    this.patternType = type;

    this.pattern.forEach(p => {

      if (p.value !== '?') {
        p.value = '';
      }
    });

    this.options.forEach(
      x => x.value = ''
    );

    this.correctIndex = 0;

    this.emit();
  }

  addOption() {

    this.options.push({

      id: crypto.randomUUID(),

      value: ''
    });

    this.emit();
  }

  removeOption(id: string) {

    this.options =
      this.options.filter(
        x => x.id !== id
      );

    if (
      this.correctIndex >=
      this.options.length
    ) {

      this.correctIndex = 0;
    }

    this.emit();
  }

  onCorrectChange(index: number) {

    this.correctIndex = index;

    this.emit();
  }

  onPatternChange(
    item: PatternItem,
    index: number
  ) {

    if (
      index === this.pattern.length - 1
    ) {

      item.value = '?';
    }

    this.emit();
  }

  onOptionChange() {
    this.emit();
  }

  // =========================
  // TRACKBY
  // =========================
  trackById(
    _: number,
    item: PatternItem
  ) {

    return item.id;
  }

  // =========================
  // EMIT
  // =========================
emit() {

  if (this.isLoading) return;

  // 🔥 detección automática
  const detectedType =
    this.isNumericPattern()
      ? 'number'
      : this.patternType;

  const expectedType =
    detectedType === 'number'
      ? 'number'
      : 'string';

  const payload = {

    dataSchema: {

      type: 'object',

      properties: {

        respuesta: {
          type: expectedType
        }

      },

      default: {

        patternType: detectedType,

        patternSize: this.patternSize,

        pattern: this.pattern.map(p => p.value),

        options: this.options.map(o => o.value),

        correctIndex: this.correctIndex
      },

      metadata: {
        mode: 'pattern-recognition'
      }

    },

    uiSchema: {

      respuesta: {

        'ui:widget': 'pattern-recognition'

      }

    }

  };

  this.lastEmittedConfig =
    JSON.stringify(payload);

  this.valueChange.emit(payload);
}
}
