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

interface RubricItem {
  id: string;
  criterio: string;
  puntaje: number;
}

@Component({
  selector: 'app-q-case-study',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-case-study.html',
  styleUrl: './q-case-study.scss'
})
export class QCaseStudy implements OnInit, OnChanges {

  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();

  placeholder = 'Analice el caso y responda...';
  minLength = 50;
  maxLength = 1000;

  keywords: string[] = [];
  rubric: RubricItem[] = [];

  private isLoading = false;
  private lastEmittedConfig = '';

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

      if (incoming === this.lastEmittedConfig) return;

      this.loadFromParent();
    }
  }

  // =========================
  // DEFAULT
  // =========================
  setDefault() {
    this.keywords = [''];
    this.rubric = [
      { id: crypto.randomUUID(), criterio: '', puntaje: 0 }
    ];
  }

  // =========================
  // LOAD FROM PARENT
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;
    const meta = cfg?.metadata ?? {};

    this.placeholder = meta?.placeholder ?? this.placeholder;
    this.minLength = cfg?.minLength ?? this.minLength;
    this.maxLength = cfg?.maxLength ?? this.maxLength;

    this.keywords = meta?.keywords?.length
      ? [...meta.keywords]
      : [''];

    this.rubric = meta?.rubric?.length
      ? meta.rubric.map((r: any) => ({
        id: crypto.randomUUID(),
        criterio: r.criterio ?? '',
        puntaje: Number(r.puntaje ?? 0)
      }))
      : [
        { id: crypto.randomUUID(), criterio: '', puntaje: 0 }
      ];

    if (this.maxLength <= this.minLength) {
      this.maxLength = this.minLength + 1;
    }

    Promise.resolve().then(() => {
      this.isLoading = false;
      this.emit(); // 🔥 edición sin tocar
    });
  }

  // =========================
  // KEYWORDS
  // =========================
  addKeyword() {
    this.keywords.push('');
    this.emit();
  }

  removeKeyword(i: number) {
    this.keywords.splice(i, 1);

    if (!this.keywords.length) {
      this.keywords = [''];
    }

    this.emit();
  }

  // =========================
  // RUBRIC
  // =========================
  addRubric() {
    this.rubric.push({
      id: crypto.randomUUID(),
      criterio: '',
      puntaje: 0
    });

    this.emit();
  }

  removeRubric(i: number) {

    this.rubric.splice(i, 1);

    if (!this.rubric.length) {
      this.addRubric();
      return;
    }

    this.emit();
  }

  // =========================
  // CHANGE
  // =========================
  onChange() {

    if (this.isLoading) return;

    if (this.maxLength <= this.minLength) {
      this.maxLength = this.minLength + 1;
    }

    this.emit();
  }

  // =========================
  // TRACKBY
  // =========================
  trackByIndex(i: number) {
    return i;
  }

  trackById(_: number, item: RubricItem) {
    return item.id;
  }

  // =========================
  // EMIT
  // =========================
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
        metadata: {
          placeholder: this.placeholder,
          keywords: this.keywords,
          rubric: this.rubric.map(r => ({
            criterio: r.criterio,
            puntaje: r.puntaje
          }))
        }
      },
      uiSchema: {
        respuesta: {
          'ui:widget': 'textarea',
          'ui:placeholder': this.placeholder
        },
        options: {
          'ui:widget': 'case-study'
        }
      }
    };

    this.lastEmittedConfig = JSON.stringify(payload);

    this.valueChange.emit(payload);
  }

}
