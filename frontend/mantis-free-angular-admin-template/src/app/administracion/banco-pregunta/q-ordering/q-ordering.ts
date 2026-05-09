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
  CdkDragDrop,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-q-ordering',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './q-ordering.html',
  styleUrl: './q-ordering.scss'
})
export class QOrdering implements OnInit, OnChanges {

  //#region INPUT / OUTPUT
  @Input() config: any;

  @Output() valueChange = new EventEmitter<any>();
  //#endregion

  //#region STATE
  items: string[] = [
    'Elemento 1',
    'Elemento 2',
    'Elemento 3'
  ];

  correctOrder: number[] = [];
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

    this.items = [
      'Elemento 1',
      'Elemento 2',
      'Elemento 3'
    ];

    this.correctOrder = [0, 1, 2];
  }

  // =========================
  // LOAD FROM PARENT
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.items = [...(cfg?.items ?? [])];

    this.correctOrder = [
      ...(cfg?.correctOrder ??
      this.items.map((_: any, i: number) => i))
    ];

    Promise.resolve().then(() => {

      this.isLoading = false;

      // 🔥 importante para edición
      this.emit();
    });
  }

  // =========================
  // DRAG
  // =========================
  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(
      this.items,
      event.previousIndex,
      event.currentIndex
    );

    moveItemInArray(
      this.correctOrder,
      event.previousIndex,
      event.currentIndex
    );

    this.emit();
  }

  // =========================
  // CRUD
  // =========================
  agregar() {

    this.items.push(
      `Elemento ${this.items.length + 1}`
    );

    this.correctOrder.push(
      this.correctOrder.length
    );

    this.emit();
  }

  eliminar(i: number) {

    this.items.splice(i, 1);

    this.correctOrder.splice(i, 1);

    this.emit();
  }

  actualizar() {

    if (this.isLoading) {
      return;
    }

    this.emit();
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

        items: this.items,

        correctOrder: this.correctOrder,

        properties: {

          respuesta: {
            type: 'array'
          }
        },

        metadata: {
          mode: 'ordering'
        }
      },

      uiSchema: {

        respuesta: {
          'ui:widget': 'ordering'
        }
      }
    };

    this.lastEmittedConfig = JSON.stringify(payload);

    this.valueChange.emit(payload);
  }
}
