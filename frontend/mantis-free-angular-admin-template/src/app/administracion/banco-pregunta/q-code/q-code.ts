import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-q-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './q-code.html'
})
export class QCode {

  //#region INPUTS
  @Input() tipo!: number;

  @Output() valueChange = new EventEmitter<any>();

  //#endregion





  //#region STATE (configuración futura)
  codigoBase: string = '';
  lenguaje: string = 'javascript';
  //#endregion

  onChange() {
    this.valueChange.emit({
      codigoBase: this.codigoBase,
      lenguaje: this.lenguaje
    });
  }

}
