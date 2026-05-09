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
  selector: 'app-q-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-rating.html',
  styleUrl: './q-rating.scss'
})
export class QRating implements OnInit, OnChanges {

  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();

  min = 1;
  max = 5;

  tipoVista: 'rating-scale' | 'stars' | 'slider' = 'rating-scale';

  minLabel = 'Muy bajo';
  maxLabel = 'Muy alto';

  selectedValue: number | null = null;

  rangeArray: number[] = [];

  private isLoading = false;

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    if (!this.config) {
      this.setDefault();
      this.updateRange();
      this.emit();
    }
  }

  // =========================
  // CHANGES
  // =========================
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.config) {
      this.loadFromParent();
    }
  }

  // =========================
  // DEFAULT
  // =========================
  setDefault() {
    this.min = 1;
    this.max = 5;
    this.tipoVista = 'rating-scale';
    this.minLabel = 'Muy bajo';
    this.maxLabel = 'Muy alto';
    this.selectedValue = null;
  }

  // =========================
  // LOAD
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    this.min = Number(cfg?.min ?? 1);
    this.max = Number(cfg?.max ?? 5);

    this.tipoVista = cfg?.widget ?? 'rating-scale';

    this.minLabel = cfg?.labels?.minLabel ?? 'Muy bajo';
    this.maxLabel = cfg?.labels?.maxLabel ?? 'Muy alto';

    this.selectedValue = cfg?.value ?? null;

    if (this.min >= this.max) {
      this.max = this.min + 1;
    }

    this.updateRange();

    Promise.resolve().then(() => {
      this.isLoading = false;
      this.emit(); // 🔥 emitir UNA VEZ
    });
  }

  // =========================
  // CHANGE
  // =========================
  onChange() {

    if (this.isLoading) return;

    if (this.min >= this.max) {
      this.max = this.min + 1;
    }

    this.updateRange();
    this.emit();
  }

  // =========================
  // TYPE
  // =========================
  onTipoChange(value: string) {

    this.tipoVista = value as any;

    this.updateRange();
    this.emit();
  }

  // =========================
  // RANGE
  // =========================
  updateRange() {
    this.rangeArray = Array.from(
      { length: this.max - this.min + 1 },
      (_, i) => this.min + i
    );
  }

  // =========================
  // SELECT
  // =========================
  select(value: number) {
    this.selectedValue = value;
    this.emit();
  }

  // =========================
  // EMIT
  // =========================
  emit() {

    if (this.isLoading) return;

    const payload = {
      dataSchema: {
        type: 'rating_scale',
        min: this.min,
        max: this.max,
        widget: this.tipoVista,
        labels: {
          minLabel: this.minLabel,
          maxLabel: this.maxLabel
        }
      },
      uiSchema: {
        options: {
          'ui:widget': this.tipoVista
        }
      }
    };

    console.log('EMIT RATING', payload);

    this.valueChange.emit(payload);
  }
}
