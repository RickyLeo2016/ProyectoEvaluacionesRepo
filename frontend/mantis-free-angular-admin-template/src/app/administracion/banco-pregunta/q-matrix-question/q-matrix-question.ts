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

interface MissingCell {
  row: number;
  col: number;
}

type AnswerValue = number | string | null;

interface AnswerItem extends MissingCell {
  value: AnswerValue;
}

@Component({
  selector: 'app-q-matrix-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-matrix-question.html',
  styleUrl: './q-matrix-question.scss'
})
export class QMatrixQuestion implements OnInit, OnChanges {

  //#region INPUT / OUTPUT
  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();
  //#endregion

  //#region STATE

  patternType: 'number' | 'letter' | 'image' = 'number';

  rows = 3;
  cols = 3;

  matrix: any[][] = [];

  missingPositions: MissingCell[] = [];
  answers: AnswerItem[] = [];

  //#endregion

  //#region INTERNAL CONTROL

  private isLoading = false;
  private lastConfigJson = '';

  //#endregion

  //#region INIT

  ngOnInit(): void {

    if (!this.config) {
      this.buildMatrix();
    }
  }

  //#endregion

  //#region CHANGES

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['config'] && this.config) {

      const incoming = JSON.stringify(this.config);

      if (incoming === this.lastConfigJson) {
        return;
      }

      this.loadConfig();
    }
  }

  //#endregion

  //#region LOAD CONFIG

  loadConfig() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.patternType = cfg.patternType ?? 'number';

    this.rows =
      cfg.rows
      ?? cfg.matrix?.length
      ?? 3;

    this.cols =
      cfg.cols
      ?? cfg.matrix?.[0]?.length
      ?? 3;

    this.matrix = JSON.parse(
      JSON.stringify(
        cfg.matrix
        ?? Array.from({ length: this.rows }, () =>
          Array.from({ length: this.cols }, () => null)
        )
      )
    );

    this.missingPositions = JSON.parse(
      JSON.stringify(cfg.missingPositions ?? [])
    );

    this.answers = JSON.parse(
      JSON.stringify(cfg.answers ?? [])
    );

    Promise.resolve().then(() => {

      this.isLoading = false;

      // 🔥 reemitir al cargar desde BD
      this.emit();
    });
  }

  //#endregion

  //#region BUILD MATRIX

  buildMatrix() {

    this.matrix = Array.from(
      { length: this.rows },
      () => Array.from(
        { length: this.cols },
        () => null
      )
    );

    this.missingPositions = [];
    this.answers = [];

    this.emit();
  }

  changeSize() {
    this.buildMatrix();
  }

  //#endregion

  //#region MISSING CELLS

  toggleMissing(i: number, j: number) {

    const exists = this.missingPositions.some(
      x => x.row === i && x.col === j
    );

    if (exists) {

      this.missingPositions =
        this.missingPositions.filter(
          x => !(x.row === i && x.col === j)
        );

      this.answers =
        this.answers.filter(
          a => !(a.row === i && a.col === j)
        );

    } else {

      this.missingPositions = [
        ...this.missingPositions,
        {
          row: i,
          col: j
        }
      ];

      this.matrix[i][j] = null;

      this.answers = [
        ...this.answers,
        {
          row: i,
          col: j,
          value: null
        }
      ];
    }

    this.emit();
  }

  isMissing(i: number, j: number): boolean {

    return this.missingPositions.some(
      x => x.row === i && x.col === j
    );
  }

  getAnswerRef(i: number, j: number): AnswerItem | undefined {

    return this.answers.find(
      a => a.row === i && a.col === j
    );
  }

  //#endregion

  //#region EVENTS

  onMatrixChange() {
    this.emit();
  }

  onAnswerChange() {
    this.emit();
  }

  //#endregion

  //#region EMIT

  emit() {

    if (this.isLoading) return;

    const payload = {
      dataSchema: {

        type: 'matrix_reasoning',

        patternType: this.patternType,

        rows: this.rows,
        cols: this.cols,

        matrix: JSON.parse(
          JSON.stringify(this.matrix)
        ),

        missingPositions: JSON.parse(
          JSON.stringify(this.missingPositions)
        ),

        answers: JSON.parse(
          JSON.stringify(this.answers)
        )
      },

      uiSchema: {
        'ui:widget': 'matrix-question'
      }
    };

    this.lastConfigJson = JSON.stringify(payload);

    this.valueChange.emit(payload);
  }

  //#endregion

  //#region TRACKBY

  trackByIndex(index: number) {
    return index;
  }

  //#endregion
}
