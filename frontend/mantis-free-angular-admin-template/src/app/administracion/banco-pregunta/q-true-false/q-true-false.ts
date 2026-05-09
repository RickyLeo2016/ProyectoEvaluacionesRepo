import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-q-true-false',
  standalone: true,
  templateUrl: './q-true-false.html'
})
export class QTrueFalse implements OnChanges {

  @Input() config: any;
  @Output() valueChange = new EventEmitter<any>();

  // =========================
  // STATE
  // =========================
  respuesta: boolean = true;

  labels = {
    true: 'Verdadero',
    false: 'Falso'
  };

  private isLoading = false;

  // =========================
  // LIFECYCLE
  // =========================
  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && this.config) {
      this.loadFromParent();
    }
  }

  // =========================
  // LOAD
  // =========================
  loadFromParent() {

    this.isLoading = true;

    const cfg = this.config?.dataSchema ?? this.config;

    if (cfg?.options?.length) {

      const trueOpt = cfg.options.find((x: any) => x.value === true);
      const falseOpt = cfg.options.find((x: any) => x.value === false);

      this.labels = {
        true: trueOpt?.text ?? 'Verdadero',
        false: falseOpt?.text ?? 'Falso'
      };

      const correct = cfg.options.find((x: any) => x.isCorrect === true);
      this.respuesta = correct?.value ?? true;
    }

    // 🔥 emitir UNA VEZ después de cargar
    Promise.resolve().then(() => {
      this.isLoading = false;
      this.emitValue();
    });
  }

  // =========================
  // EVENTS
  // =========================
  onRespuestaChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.respuesta = value === 'true';
    this.emitValue();
  }

  onLabelChange(type: 'true' | 'false', event: Event) {
    const input = event.target as HTMLInputElement;
    this.labels[type] = input.value || (type === 'true' ? 'Verdadero' : 'Falso');
    this.emitValue();
  }

  // =========================
  // EMIT (FORMATO PADRE)
  // =========================
  private emitValue() {

    if (this.isLoading) return;

    const payload = {
      dataSchema: {
        type: 'true_false',
        options: [
          {
            text: this.labels.true,
            value: true,
            isCorrect: this.respuesta === true
          },
          {
            text: this.labels.false,
            value: false,
            isCorrect: this.respuesta === false
          }
        ]
      },
      uiSchema: {
        options: {
          'ui:widget': 'radio-list'
        }
      }
    };

    this.valueChange.emit(payload);
  }
}
