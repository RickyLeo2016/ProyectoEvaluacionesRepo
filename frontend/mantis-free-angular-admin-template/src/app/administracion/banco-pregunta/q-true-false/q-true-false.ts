import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-q-true-false',
  standalone: true,
  templateUrl: './q-true-false.html'
})
export class QTrueFalse {

  @Output() valueChange = new EventEmitter<any>();

  // ✅ valor por defecto (nunca null)
  respuesta: boolean = true;

  // ✅ labels siempre definidos
  labels = {
    true: 'Verdadero',
    false: 'Falso'
  };

  ngOnInit() {
    this.emitValue(); // 🔥 asegura valor inicial
  }

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

  private emitValue() {
    this.valueChange.emit({
      respuesta: this.respuesta,
      labels: this.labels
    });
  }

}
