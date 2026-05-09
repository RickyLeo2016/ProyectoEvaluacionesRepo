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

interface SemanticItem {
  left: string;
  right: string;
}

@Component({
  selector: 'app-q-semantic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-semantic.html',
  styleUrl: './q-semantic.scss'
})
export class QSemantic implements OnInit, OnChanges {

  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();

  scale: number = 5;

  items: SemanticItem[] = [];

  rangeArray: number[] = [];

  private isLoading = false;

  // =========================
  // INIT
  // =========================
  ngOnInit() {
    if (!this.config) {
      this.setDefault();
      this.updateRange();
      this.emitir();
    }
  }

  // =========================
  // CHANGES
  // =========================
  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && this.config) {
      this.loadFromParent();
    }
  }

  // =========================
  // DEFAULT
  // =========================
  setDefault() {
    this.scale = 5;

    this.items = [
      { left: 'Malo', right: 'Bueno' },
      { left: 'Lento', right: 'Rápido' }
    ];
  }

  // =========================
  // LOAD
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.scale = cfg?.scale ?? 5;

    if (cfg?.items?.length) {
      this.items = cfg.items.map((i: any) => ({
        left: i.left ?? '',
        right: i.right ?? ''
      }));
    } else {
      this.setDefault();
    }

    this.updateRange();

    Promise.resolve().then(() => {
      this.isLoading = false;
      this.emitir(); // 🔥 EMITE UNA VEZ
    });
  }

  // =========================
  // ITEMS
  // =========================
  addItem() {
    this.items = [...this.items, { left: '', right: '' }];
    this.emitir();
  }

  removeItem(i: number) {
    this.items = this.items.filter((_, index) => index !== i);
    this.emitir();
  }

  onChange() {
    this.updateRange();
    this.emitir();
  }

  // =========================
  // RANGE
  // =========================
  updateRange() {
    this.rangeArray = Array.from({ length: this.scale }, (_, i) => i);
  }

  // =========================
  // TRACK
  // =========================
  trackByIndex(index: number) {
    return index;
  }

  // =========================
  // EMIT
  // =========================
  private emitir() {

    if (this.isLoading) return;

    const payload = {
      dataSchema: {
        type: 'semantic_differential',
        scale: this.scale,
        items: this.items.map(i => ({
          left: i.left,
          right: i.right
        }))
      },
      uiSchema: {
        options: {
          'ui:widget': 'semantic-scale'
        }
      }
    };

    this.valueChange.emit(payload);
  }
}
