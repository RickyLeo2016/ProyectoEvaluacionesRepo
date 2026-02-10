import { Component, OnInit, NgZone, signal, computed, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Grid } from 'src/app/theme/shared/components/grid/grid';
import { TipoCatalogoService } from 'src/app/services/tipoCatalogo/tipo-catalogo';
import { TipoCatalogo as TipoCatalogoModel } from 'src/app/services/tipoCatalogo/tipo-catalogo';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';

import { AuthService } from 'src/app/services/auth/auth-service';


export interface ITipoCatalogo {
  tipCatId?: number;
  tipCatDescripcion: string;
  tipCatEstado: string;
  usuIdReg: number;
}

export interface AccionTabla<T> {
  label: string;
  callback: (item: T) => void;
  class?: string;
}

@Component({
  selector: 'app-tipo-catalogo',
  standalone: true,
  imports: [CommonModule, CardComponent, Grid, HttpClientModule, SpinnerComponent],
  templateUrl: './tipo-catalogo.html'
})
export class TipoCatalogo implements OnInit {




 @ViewChild('spinnerExterno') spinner!: SpinnerComponent;

  // Señales
  tipos = signal<ITipoCatalogo[]>([]);

  nombre = signal<string>('');
  descripcion = signal<string>('');
  estado = signal<string>('A');
  editandoId = signal<number | null>(null);
  usuIdReg = signal<number>(1);

  nombreTocado = signal<boolean>(false);
  descripcionTocado = signal<boolean>(false);

  filtro = signal<string>('');
  tiposFiltrados = computed(() => {
    const filterValue = this.filtro().toLowerCase();
    if (!filterValue) return this.tipos();
    return this.tipos().filter(t =>
      t.tipCatDescripcion.toLowerCase().includes(filterValue)
    );
  });

  columnas = [
    { header: 'ID', field: 'tipCatId' },
    { header: 'Nombre', field: 'tipCatDescripcion' },
    { header: 'Estado', field: 'tipCatEstado' },
    { header: 'Acciones', field: 'acciones' }
  ];

  accionesTabla: AccionTabla<ITipoCatalogo>[] = [
    { label: 'Editar', callback: (item) => this.seleccionarParaEditar(item), class: 'btn btn-primary btn-sm' },
    { label: 'Eliminar', callback: (item) => this.eliminar(item), class: 'btn btn-danger btn-sm' }
  ];

  constructor(
    private tipoService: TipoCatalogoService, 
    private ngZone: NgZone,
    private auth: AuthService, 

  ) {}

  ngOnInit() {
    this.cargarTipos();
  }

  cargarTipos() {
  this.tipoService.obtenerTodos().subscribe({
    next: res => {
      this.spinner.show();
      if (res.isSuccess && res.data) {
        this.tipos.set(res.data as ITipoCatalogo[]);
      } else {
        // si la respuesta vino con isSuccess = false, puedes mostrar su mensaje
        this.ngZone.run(() =>
          Swal.fire('Error', res.message || 'Error desconocido', 'error')
        );
      }
      this.spinner.hide();
    },
    error: err => {
      this.spinner.hide();
      // err es HttpErrorResponse, puedes leer err.error (el body retornado desde backend)
      const apiMsg = err.error?.message || 'Error cargando tipos';
      this.ngZone.run(() => Swal.fire('Error', apiMsg+'......', 'error'));
      // this.auth.logout();// limpia token / estado
      
    }
  });
}



  seleccionarParaEditar(tipo: ITipoCatalogo) {
    
    this.editandoId.set(tipo.tipCatId ?? null);
    this.nombre.set(tipo.tipCatDescripcion);
    this.descripcion.set(tipo.tipCatDescripcion);
    this.estado.set(tipo.tipCatEstado);
    this.nombreTocado.set(false);
    this.descripcionTocado.set(false);
  }

  limpiarCampos() {
    
    this.editandoId.set(null);
    this.nombre.set('');
    this.descripcion.set('');
    this.estado.set('A');
    this.nombreTocado.set(false);
    this.descripcionTocado.set(false);
  }

  guardar() {
    
    this.nombreTocado.set(true);
    this.descripcionTocado.set(true);

    if (!this.nombre() || !this.descripcion()) {
      setTimeout(() => Swal.fire('Error', 'Debe completar todos los campos', 'warning'));
      return;
    }
    
    this.spinner.show();

    const payload: TipoCatalogoModel = {
      tipCatDescripcion: this.descripcion(),
      tipCatEstado: this.estado(),
      usuIdReg: this.usuIdReg()
    };

    

    const obs = this.editandoId()
      ? this.tipoService.actualizar({ ...payload, tipCatId: this.editandoId()! })
      : this.tipoService.guardar(payload);

    obs.subscribe({
      next: res => {
        this.spinner.hide();  
        if (res.isSuccess && res.data) {
          Swal.fire('Éxito', this.editandoId() ? 'Actualizado' : 'Registrado', 'success');
          this.cargarTipos();
          this.limpiarCampos();
        } else {
          Swal.fire('Error', res.message || 'Error desconocido', 'error');
          this.spinner.hide();
        }
      },
      error: err => {
        Swal.fire('Error', 'Error al guardar', 'error');
        this.spinner.hide(); 
      }
    });
  }

  eliminar(tipo: ITipoCatalogo) {
    this.ngZone.run(() => {
      Swal.fire({
        title: '¿Eliminar?',
        text: `¿Deseas eliminar ${tipo.tipCatDescripcion}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar'
      }).then(result => {
        if (result.isConfirmed) {
          this.tipoService.eliminar(tipo.tipCatId!).subscribe({
            next: res => {
              if (res.isSuccess && res.data) {
                Swal.fire('Eliminado', 'El registro fue eliminado', 'success');
                this.cargarTipos();
              } else {
                Swal.fire('Error', res.message, 'error');
              }
            },
            error: err => {
              Swal.fire('Error', 'No se pudo eliminar', 'error');
            }
          });
        } 
      });
    });
  }
}
