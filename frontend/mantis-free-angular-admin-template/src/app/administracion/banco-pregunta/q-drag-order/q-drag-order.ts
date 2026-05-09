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

interface DragOrderItem {
  id: number;
  text: string;
}

@Component({
  selector: 'app-q-drag-order',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './q-drag-order.html',
  styleUrl: './q-drag-order.scss'
})
export class QDragOrder implements OnInit, OnChanges {

  //#region INPUT / OUTPUT
  @Input() config: any;

  @Output() valueChange = new EventEmitter<any>();
  //#endregion

  //#region STATE
  items: DragOrderItem[] = [];

  correctOrder: number[] = [];
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

    this.items = [
      { id: 1, text: 'Paso 1' },
      { id: 2, text: 'Paso 2' },
      { id: 3, text: 'Paso 3' }
    ];

    this.syncCorrectOrder();
  }

  // =========================
  // LOAD
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.items = [...(cfg?.items ?? [])];

    this.correctOrder = [
      ...(cfg?.correctOrder ?? [])
    ];

    if (!this.correctOrder.length) {
      this.syncCorrectOrder(false);
    }

    Promise.resolve().then(() => {

      this.isLoading = false;

      this.emit();
    });
  }

  // =========================
  // CRUD
  // =========================
  addItem() {

    const nextId = this.generateId();

    this.items.push({
      id: nextId,
      text: ''
    });

    this.syncCorrectOrder();
  }

  removeItem(i: number) {

    this.items.splice(i, 1);

    this.syncCorrectOrder();
  }

  // =========================
  // DRAG
  // =========================
  drop(event: CdkDragDrop<DragOrderItem[]>) {

    moveItemInArray(
      this.items,
      event.previousIndex,
      event.currentIndex
    );

    this.syncCorrectOrder();
  }

  // =========================
  // HELPERS
  // =========================
  syncCorrectOrder(emit = true) {

    this.correctOrder = this.items.map(x => x.id);

    if (emit) {
      this.emit();
    }
  }

  generateId(): number {

    if (!this.items.length) {
      return 1;
    }

    return Math.max(...this.items.map(x => x.id)) + 1;
  }

  // =========================
  // TRACKBY
  // =========================
  trackById(_: number, item: DragOrderItem) {
    return item.id;
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
          mode: 'drag-order'
        }
      },

      uiSchema: {

        respuesta: {
          'ui:widget': 'drag-order'
        }
      }
    };

    this.lastEmittedConfig = JSON.stringify(payload);

    this.valueChange.emit(payload);
  }
}
