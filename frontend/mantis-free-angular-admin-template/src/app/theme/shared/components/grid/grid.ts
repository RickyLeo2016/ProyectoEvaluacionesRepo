import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, signal, SimpleChanges, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconsFather } from 'src/app/services/iconsFather/icons-father';


interface Columna {
  header: string;
  field: string;
}

@Component({
  selector: 'app-grid',
  imports: [CommonModule, FormsModule],
  templateUrl: './grid.html',
})
export class Grid implements OnChanges {

  constructor(
    private iconFather: IconsFather

  ) {}

  @Input() columnas: Columna[] = [];
  @Input() datos: any[] = [];
  @Input() templates: { [field: string]: TemplateRef<any> } = {};

  filtro: string = '';
  datosFiltrados: any[] = [];
  paginaDatos: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 10;
  opcionesItems: number[] = [10, 20, 50, 100];
  totalPaginas: number = 1;
  paginas: number[] = [];

  mostrandoDesde: number = 0;
  mostrandoHasta: number = 0;

  // Ordenamiento
  columnaOrden = signal<string>(''); 
  ordenAscendente = signal<boolean>(true);
esColumnaActiva(col: string) {
  return this.columnaOrden() === col;
}

esAsc(col: string) {
  return this.esColumnaActiva(col) && this.ordenAscendente();
}

esDesc(col: string) {
  return this.esColumnaActiva(col) && !this.ordenAscendente();
}


ordenarPor(columna: string) {
  if (this.columnaOrden() === columna) {
    this.ordenAscendente.set(!this.ordenAscendente());
  } else {
    this.columnaOrden.set(columna);
    this.ordenAscendente.set(true);
  }

  const asc = this.ordenAscendente();
  this.datosFiltrados.sort((a, b) => {
    const valA = a[columna] ?? '';
    const valB = b[columna] ?? '';
    if (valA < valB) return asc ? -1 : 1;
    if (valA > valB) return asc ? 1 : -1;
    return 0;
  });

  this.actualizarPaginaDatos();
}



  // ordenarPor(columna: string) {
  //   if (this.columnaOrden() === columna) {
  //     this.ordenAscendente.set(!this.ordenAscendente());
  //   } else {
  //     this.columnaOrden.set(columna);
  //     this.ordenAscendente.set(true);
  //   }

  //   const asc = this.ordenAscendente();
  //   this.datosFiltrados.sort((a, b) => {
  //     const valA = a[columna] ?? '';
  //     const valB = b[columna] ?? '';
  //     if (valA < valB) return asc ? -1 : 1;
  //     if (valA > valB) return asc ? 1 : -1;
  //     return 0;
  //   });

  //   this.actualizarPaginaDatos();
  // }

  ngAfterViewInit() {
    this.iconFather.init(); 
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['datos']) {
      this.filtrar();
    }
  }

  filtrar() {
    if (this.filtro) {
      this.datosFiltrados = this.datos.filter(d =>
        Object.values(d).some(val =>
          String(val).toLowerCase().includes(this.filtro.toLowerCase())
        )
      );
    } else {
      this.datosFiltrados = [...this.datos];
    }
    this.paginaActual = 1;
    this.calcularPaginas();
    this.actualizarPaginaDatos();
  }

  cambiarPagina(p: number) {
    if (p < 1 || p > this.totalPaginas) return;
    this.paginaActual = p;
    this.actualizarPaginaDatos();
  }

  cambiarItemsPorPagina(event: any) {
    this.itemsPorPagina = +event.target.value;
    this.paginaActual = 1;
    this.calcularPaginas();
    this.actualizarPaginaDatos();
  }

  calcularPaginas() {
    this.totalPaginas = Math.ceil(this.datosFiltrados.length / this.itemsPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  actualizarPaginaDatos() {
    const start = (this.paginaActual - 1) * this.itemsPorPagina;
    const end = start + this.itemsPorPagina;
    this.paginaDatos = this.datosFiltrados.slice(start, end);
    this.mostrandoDesde = this.datosFiltrados.length ? start + 1 : 0;
    this.mostrandoHasta = Math.min(end, this.datosFiltrados.length);
  }
}
