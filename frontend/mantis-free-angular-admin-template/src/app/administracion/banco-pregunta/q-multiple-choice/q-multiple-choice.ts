import { Component, signal, EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-q-multiple-choice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-multiple-choice.html',
  styleUrl: './q-multiple-choice.scss'
})
export class QMultipleChoice {

   opciones = signal<string[]>(['']);
  correcta = signal<number | null>(null);

  @Output() valueChange = new EventEmitter<any>();

  emitir() {
    this.valueChange.emit({
      opciones: this.opciones(),
      correcta: this.correcta()
    });
  }

  actualizar(index: number, valor: string) {
    this.opciones.update(arr => {
      const copia = [...arr];
      copia[index] = valor;
      return copia;
    });

    this.emitir(); // 🔥
  }

  seleccionarCorrecta(index: number) {
    this.correcta.set(index);
    this.emitir(); // 🔥
  }

  agregar() {
    this.opciones.update(arr => [...arr, '']);
    this.emitir();
  }

  eliminar(index: number) {
    this.opciones.update(arr => arr.filter((_, i) => i !== index));

    if (this.correcta() === index) {
      this.correcta.set(null);
    }

    this.emitir(); // 🔥
  }
}
