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

import {
  DragDropModule,
  CdkDragDrop
} from '@angular/cdk/drag-drop';

interface MatchItem {
  id: number;
  text: string;
}

@Component({
  selector: 'app-q-drag-drop-match',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './q-drag-drop-match.html',
  styleUrl: './q-drag-drop-match.scss'
})
export class QDragDropMatch implements OnInit, OnChanges {

  //#region INPUT / OUTPUT
  @Input() config: any;

  @Output() valueChange = new EventEmitter<any>();
  //#endregion

  //#region STATE
  left: MatchItem[] = [];

  right: MatchItem[] = [];

  matches: (number | null)[] = [];
  //#endregion

  //#region CONTROL
  private timeout: any;

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

    this.left = [
      { id: 1, text: 'Perro' },
      { id: 2, text: 'Manzana' }
    ];

    this.right = [
      { id: 1, text: 'Animal' },
      { id: 2, text: 'Fruta' }
    ];

    this.initMatches();
  }

  // =========================
  // LOAD
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.left = [...(cfg?.left ?? [])];

    this.right = [...(cfg?.right ?? [])];

    this.initMatches();

    Promise.resolve().then(() => {

      this.isLoading = false;

      this.emit();
    });
  }

  // =========================
  // INIT MATCHES
  // =========================
  initMatches() {

    this.matches = this.left.map(() => null);
  }

  // =========================
  // CRUD
  // =========================
  addPair() {

    const nextId = this.generateId();

    this.left.push({
      id: nextId,
      text: ''
    });

    this.right.push({
      id: nextId,
      text: ''
    });

    this.matches.push(null);

    this.emit();
  }

  removePair(i: number) {

    const leftId = this.left[i].id;

    this.left.splice(i, 1);

    this.right = this.right.filter(
      x => x.id !== leftId
    );

    this.matches.splice(i, 1);

    this.emit();
  }

  // =========================
  // DRAG
  // =========================
  drop(
    event: CdkDragDrop<MatchItem[]>,
    index: number
  ) {

    if (event.previousContainer === event.container) {
      return;
    }

    const value =
      event.previousContainer.data[event.previousIndex];

    this.matches[index] = value.id;

    this.emit();
  }

  // =========================
  // HELPERS
  // =========================
  getMatchText(matchId: number | null): string {

    if (matchId == null) {
      return '';
    }

    return (
      this.right.find(x => x.id === matchId)?.text ?? ''
    );
  }

  generateId(): number {

    const ids = [
      ...this.left.map(x => x.id),
      ...this.right.map(x => x.id)
    ];

    if (!ids.length) {
      return 1;
    }

    return Math.max(...ids) + 1;
  }

  // =========================
  // EMIT
  // =========================
  emitirDebounce() {

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.emit();
    }, 300);
  }

  emit() {

    if (this.isLoading) {
      return;
    }

    const correctPairs = this.left.map((l, i) => ({
      leftId: l.id,
      rightId: this.right[i]?.id ?? null
    }));

    const payload = {

      dataSchema: {

        type: 'object',

        left: this.left,

        right: this.right,

        correctPairs,

        properties: {

          respuesta: {
            type: 'array'
          }
        },

        metadata: {
          mode: 'drag-drop-match'
        }
      },

      uiSchema: {

        respuesta: {
          'ui:widget': 'drag-drop-match'
        }
      }
    };

    this.lastEmittedConfig = JSON.stringify(payload);

    this.valueChange.emit(payload);
  }

  // =========================
  // TRACKBY
  // =========================
  trackById(_: number, item: MatchItem) {
    return item.id;
  }
}
