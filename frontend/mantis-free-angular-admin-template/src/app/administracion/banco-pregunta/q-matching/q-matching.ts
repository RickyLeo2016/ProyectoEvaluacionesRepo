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
  CdkDragDrop,
  moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-q-matching',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './q-matching.html',
  styleUrl: './q-matching.scss'
})
export class QMatching implements OnInit, OnChanges {

  //#region INPUT / OUTPUT
  @Input() config: any;

  @Output() valueChange = new EventEmitter<any>();
  //#endregion

  //#region STATE
  left: string[] = [];

  right: string[] = [];

  correctPairs: any[] = [];
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
      'Perro',
      'Manzana'
    ];

    this.right = [
      'Animal',
      'Fruta'
    ];

    this.syncPairs();
  }

  // =========================
  // LOAD FROM PARENT
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.left = [...(cfg?.left ?? [])];

    this.right = [...(cfg?.right ?? [])];

    this.correctPairs = [...(cfg?.correctPairs ?? [])];

    this.syncPairs(false);

    Promise.resolve().then(() => {

      this.isLoading = false;

      // 🔥 importante para edición
      this.emit();
    });
  }

  // =========================
  // LEFT
  // =========================
  addLeft() {

    this.left.push('');

    this.right.push('');

    this.syncPairs();
  }

  removeLeft(i: number) {

    this.left.splice(i, 1);

    this.right.splice(i, 1);

    this.syncPairs();
  }

  // =========================
  // DRAG
  // =========================
  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(
      this.right,
      event.previousIndex,
      event.currentIndex
    );

    this.syncPairs();
  }

  // =========================
  // LOGIC
  // =========================
  syncPairs(emit = true) {

    this.correctPairs = this.left.map((_, i) => ({
      left: i,
      right: i
    }));

    if (emit) {
      this.emit();
    }
  }

  // =========================
  // TRACKBY
  // =========================
  trackByIndex(index: number) {
    return index;
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

        left: this.left,

        right: this.right,

        correctPairs: this.correctPairs,

        properties: {

          respuesta: {
            type: 'array'
          }
        },

        metadata: {
          mode: 'matching'
        }
      },

      uiSchema: {

        respuesta: {
          'ui:widget': 'matching'
        }
      }
    };

    this.lastEmittedConfig = JSON.stringify(payload);

    this.valueChange.emit(payload);
  }
}
