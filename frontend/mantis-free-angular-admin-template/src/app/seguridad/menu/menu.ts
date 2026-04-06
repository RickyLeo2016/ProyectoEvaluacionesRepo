
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

import { finalize } from 'rxjs/operators';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Grid } from 'src/app/theme/shared/components/grid/grid';
import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';
import { Modal } from 'src/app/theme/shared/components/modal/modal';

import { MenuService } from 'src/app/services/menu/menu';
import { AuthService } from 'src/app/services/auth/auth-service';

//#region Interfaces
export interface IMenu {
  menId?: number;
  menNombre: string;
  menRuta: string;
  menIcono: string;
  menOrden: number;
  menPadreId: number;
}

export interface IMenuPadre {
  menId?: number;
  menNombre: string;
}



export interface AccionTabla<T> {
  icon: string;
  color: string;
  callback: (item: T) => void;
  title?: string;
}
//#endregion



@Component({
  selector: 'app-menu',
  imports: [CommonModule, HttpClientModule, CardComponent, Grid, SpinnerComponent, Modal],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})


export class Menu implements OnInit {

  //#region STATE
  modalVisible = false;
  spinnerVisible = signal(false);

  menu = signal<IMenu[]>([]);
  editandoId = signal<number | null>(null);

  nombre = signal<string>('');
  nombreTocado = signal<boolean>(false);
  
  ruta = signal<string>('');
  rutaTocado = signal<boolean>(false);
  
  orden = signal<number | null>(1);
  ordenTocado = signal<boolean>(false);
  
  icono = signal<string>('');
  iconoTocado = signal<boolean>(false);



  
  padreList = signal<IMenuPadre[]>([]);
  padreSeleccionado = signal<number | null>(0);
  padreTocado = signal<boolean>(false);





  
  modo = signal<'nuevo' | 'editar'>('nuevo');


  //Filtro para DataTable
  filtro = signal<string>('');
  tiposFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.menu();
    return this.menu().filter((t) => t.menNombre?.toLowerCase().includes(f));
  });

  tituloModal = computed(() => (this.modo() === 'nuevo' ? 'Nuevo Menú' : 'Actualizar Menú'));
  //#endregion

  //#region TABLE
  columnas = [
    
    { header: 'Nombre Menú', field: 'menNombre' },
    { header: 'Icono Menú', field: 'menIcono' },

    { header: 'Ruta Menú', field: 'menRuta' },
    { header: 'Orden Menú', field: 'menOrden' },
    { header: 'Menú Padre', field: 'esPadre' },



    { header: 'Estado', field: 'menEstadoDesc' },
    { header: 'Acciones', field: 'acciones' }
  ];

  accionesTabla: AccionTabla<IMenu>[] = [
    { icon: 'fas fa-edit', title: 'Editar', color: '#3d5bbe', callback: (item) => this.seleccionarParaEditar(item) },
    { icon: 'fas fa-trash', title: 'Eliminar', color: '#dc3545', callback: (item) => this.eliminar(item) }
  ];
  //#endregion




  /*==========================================================*/ 
  
  catIdEstado = signal<number | null>(1);
  estado = signal<string>('1');

  constructor(
    private auth: AuthService,
    private menuService: MenuService,
    
  ) {}

  ngOnInit(): void {
    this.cargarListas();
  }


onPadreChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.padreSeleccionado.set(value ? Number(value) : null);
}


onOrdenInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.orden.set(value !== '' ? Number(value) : null);
}

onInputOrden(event: Event) {
  const input = event.target as HTMLInputElement;
  const limpio = input.value.replace(/[^0-9]/g, '').slice(0, 3);
  input.value = limpio;
  this.orden.set(limpio !== '' ? Number(limpio) : null);
}


cargarListaMenuPadre(): void {
    this.spinnerVisible.set(true);
    this.menuService.obtenerTodos().subscribe({
      next: res => {
        if (res.isSuccess && res.data) this.padreList.set(res.data);
        else Swal.fire('Error', res.message || 'Error desconocido', 'error');
        this.spinnerVisible.set(false);
      },
      error: err => {
        this.spinnerVisible.set(false);
        Swal.fire('Error', err.error?.message || 'Error cargando menús padre', 'error');
        this.auth.logout();
      }
    });
  }


  cargarListas(): void{
    this.cargarLista();
    this.cargarListaMenuPadre();
  }



  //#region MÉTODOS
  cargarLista(): void {
      this.spinnerVisible.set(true);
  
      this.menuService
        .obtenerTodos()
        .pipe(
          finalize(() => {
            this.spinnerVisible.set(false);
          })
        )
        .subscribe({
          next: (res) => {
            if (res.isSuccess && res.data) {
              this.menu.set(res.data);
            } else {
              Swal.fire('Error', res.message || 'Error desconocido', 'error');
            }
          },
          error: (err) => {
            Swal.fire('Error', err.error?.message || 'Error al cargar información', 'error');
          }
        });
    }
  
    seleccionarParaEditar(item: IMenu): void {
      this.modo.set('editar');
      this.editandoId.set(item.menId ?? null);
      this.nombre.set(item.menNombre);
      this.ruta.set(item.menRuta);
      this.icono.set(item.menIcono);
      this.orden.set(item.menOrden);
      this.padreSeleccionado.set(0);
      this.itemsTocado(false);
      this.modalVisible = true;
    }
  
  
    itemsTocado(valor :boolean){
      this.nombreTocado.set(valor);
      this.rutaTocado.set(valor);
      this.ordenTocado.set(valor);
      this.iconoTocado.set(valor);
      
    }
  
    limpiarCampos(): void {
      this.editandoId.set(null);
      this.nombre.set('');
      this.ruta.set('');
      this.icono.set('');
      this.orden.set(0);
      
      this.itemsTocado(false);
    }
  
    guardar(): void {
      this.itemsTocado(true);

      if (
        this.editandoId() ==  this.padreSeleccionado()
      ) {
        Swal.fire('Error', 'El menú seleccionado no puede ser su mismo padre', 'error');
        return;
      }

      if (
        !this.nombre() 
      ) {
        Swal.fire('Error', 'Debe completar todos los campos', 'warning');
        return;
      }
  
      const payload: IMenu = {
        menId: this.editandoId() ?? undefined,
        menNombre: this.nombre(),
        menRuta: this.ruta(),
        menOrden: this.orden(),
        menIcono: this.icono(),
        menPadreId: this.padreSeleccionado()

      };
  
      this.spinnerVisible.set(true);
  
      console.log(this.editandoId())
      const obs = this.editandoId() !== null ? this.menuService.actualizar(payload) : this.menuService.guardar(payload);
  
      obs.subscribe({
        next: (res) => {
          this.spinnerVisible.set(false);
          if (res.isSuccess) {
            Swal.fire('Éxito', this.editandoId() ? 'Actualizado correctamente' : 'Registrado correctamente', 'success');
            this.cargarListas();
            this.cerrarModal();
          } else Swal.fire('Error', res.message || 'Error desconocido', 'error');
        },
        error: () => {
          this.spinnerVisible.set(false);
          Swal.fire('Error', 'Error al guardar', 'error');
        }
      });
    }
  
    //#region Eliminar
  
    eliminar(item: IMenu): void {
      // Swal.fire({
      //   title: '¿Eliminar Rol?',
      //   text: `¿Estás seguro de eliminar a ${item.rolNombre}? Esta acción no se puede revertir.`,
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Sí, eliminar'
      // }).then((result) => {
      //   console.log('Item a eliminar:', item);
      //   if (result.isConfirmed && item.rolId) {
      //     this.spinnerVisible.set(true);
      //     this.rolService.eliminar(item.rolId).subscribe({
      //       next: (res) => {
      //         this.spinnerVisible.set(false);
      //         if (res.isSuccess) {
      //           Swal.fire('Eliminado', 'Registro eliminado', 'success');
      //           this.cargarLista();
      //         }
      //       },
      //       error: () => {
      //         this.spinnerVisible.set(false);
      //         Swal.fire('Error', 'No se pudo eliminar', 'error');
      //       }
      //     });
      //   }
      // });
    }
    //#endregion
  
    abrirModal(): void {
      this.limpiarCampos();
      this.modo.set('nuevo');
      this.modalVisible = true;
    }
  
    cerrarModal(): void {
      this.modalVisible = false;
      this.limpiarCampos();
    }
    //#endregion
  }
  
