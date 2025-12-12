import { Component, OnInit, NgZone, signal, computed, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Grid } from 'src/app/theme/shared/components/grid/grid';
import { CatalogoService } from 'src/app/services/catalogo/catalogo';
import { TipoCatalogoService } from 'src/app/services/tipoCatalogo/tipo-catalogo';
// import { TipoCatalogo as TipoCatalogoModel } from 'src/app/services/tipoCatalogo/tipo-catalogo';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';

import { AuthService } from 'src/app/services/auth/auth-service';
import { Modal } from 'src/app/theme/shared/components/modal/modal';

export interface ICatalogo {
  catId?: number;
  tipCatId?: number;
  catNombre: string;
  catDescripcion: string;
  catEstado: string;
  tipCatDescripcion: string;
  usuIdReg: number;
}

export interface ITipoCatalogo {
  tipCatId?: number;
  tipCatDescripcion: string;
}

export interface AccionTabla<T> {
  label: string;
  callback: (item: T) => void;
  class?: string;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, CardComponent, Grid, HttpClientModule, SpinnerComponent, Modal],
  templateUrl: './catalogo.html'
})
export class Catalogo implements OnInit {

 @ViewChild('spinnerExterno') spinner!: SpinnerComponent;


  modalVisible = false;

  abrirModal() {
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
  }



  // Señales
  tipos = signal<ICatalogo[]>([]);

  tipoCatalogoList = signal<ITipoCatalogo[]>([]);


  tipoSeleccionado = signal<string>('');


  nombre = signal<string>('');
  descripcion = signal<string>('');
  estado = signal<string>('Activo');
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
    { header: 'ID', field: 'catId' },
    // { header: 'ID', field: 'tipCatId' },
    { header: 'Tipo Catálogo', field: 'tipCatDescripcion' },
    { header: 'Catálogo', field: 'catNombre' },
    { header: 'Catálogo Descripción', field: 'catDescripcion' },
    { header: 'Estado', field: 'catEstado' },
    { header: 'Acciones', field: 'acciones' }
  ];

  accionesTabla: AccionTabla<ICatalogo>[] = [
    { label: 'Editar', callback: (item) => this.seleccionarParaEditar(item), class: 'btn btn-primary btn-sm' },
    { label: 'Eliminar', callback: (item) => this.eliminar(item), class: 'btn btn-danger btn-sm' }
  ];

  constructor(
    private catService: CatalogoService, 
    private tipCatService: TipoCatalogoService, 
    private ngZone: NgZone,
    private auth: AuthService, 

  ) {}

  ngOnInit() {
    this.cargarListaCatalogo();
    this.cargarTipoCatalogoDrop()
  }


 
  //#region 
  cargarListaCatalogo() {
    this.catService.obtenerTodos().subscribe({
      next: res => {
        this.spinner.show();
        if (res.isSuccess && res.data) {
          this.tipos.set(res.data as ICatalogo[]);
        } else {
          this.ngZone.run(() =>
            Swal.fire('Error', res.message || 'Error desconocido', 'error')
          );
        }
        this.spinner.hide();
      },
      error: err => {
        this.spinner.hide();
        const apiMsg = err.error?.message || 'Error cargando tipos';
        this.ngZone.run(() => Swal.fire('Error', apiMsg+'......', 'error'));
        this.auth.logout();// limpia token / estado
      }
    });
  }

  cargarTipoCatalogoDrop() {
    this.tipCatService.obtenerTodos().subscribe({
      next: res => {
        this.spinner.show();
        if (res.isSuccess && res.data) {
          console.log(res.data)
          this.tipoCatalogoList.set(res.data as ITipoCatalogo[]);
        } else {
          this.ngZone.run(() =>
            Swal.fire('Error', res.message || 'Error desconocido', 'error')
          );
        }
        this.spinner.hide();
      },
      error: err => {
        this.spinner.hide();
        const apiMsg = err.error?.message || 'Error cargando tipos';
        this.ngZone.run(() => Swal.fire('Error', apiMsg, 'error'));
        this.auth.logout();
      }
    });
  }


  //#endregion



  seleccionarParaEditar(tipo: ICatalogo) {
    
    // this.editandoId.set(tipo.tipCatId ?? null);
    // this.nombre.set(tipo.tipCatDescripcion);
    // this.descripcion.set(tipo.tipCatDescripcion);
    // this.estado.set(tipo.tipCatEstado);
    // this.nombreTocado.set(false);
    // this.descripcionTocado.set(false);
  }

  limpiarCampos() {
    
    this.editandoId.set(null);
    this.nombre.set('');
    this.descripcion.set('');
    this.estado.set('Activo');
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

    const payload: ICatalogo = {
      catNombre: this.nombre(),
      catDescripcion: this.nombre(),
      tipCatDescripcion: this.descripcion(),
      catEstado: this.estado(),
      usuIdReg: this.usuIdReg()
    };

    

    // const obs = this.editandoId()
    //   ? this.catService.actualizar({ ...payload, tipCatId: this.editandoId()! })
    //   : this.catService.guardar(payload);

    // obs.subscribe({
    //   next: res => {
    //     this.spinner.hide();  
    //     if (res.isSuccess && res.data) {
    //       Swal.fire('Éxito', this.editandoId() ? 'Actualizado' : 'Registrado', 'success');
    //       this.cargarTipos();
    //       this.limpiarCampos();
    //     } else {
    //       Swal.fire('Error', res.message || 'Error desconocido', 'error');
    //       this.spinner.hide();
    //     }
    //   },
    //   error: err => {
    //     Swal.fire('Error', 'Error al guardar', 'error');
    //     this.spinner.hide(); 
    //   }
    // });
  }

  eliminar(tipo: ICatalogo) {
    this.ngZone.run(() => {
      Swal.fire({
        title: '¿Eliminar?',
        text: `¿Deseas eliminar ${tipo.tipCatDescripcion}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar'
      }).then(result => {
        if (result.isConfirmed) {
          this.catService.eliminar(tipo.tipCatId!).subscribe({
            next: res => {
              if (res.isSuccess && res.data) {
                Swal.fire('Eliminado', 'El registro fue eliminado', 'success');
                this.cargarListaCatalogo();
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
