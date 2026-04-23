import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

import { finalize } from 'rxjs/operators';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Grid } from 'src/app/theme/shared/components/grid/grid';
import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';
import { Modal } from 'src/app/theme/shared/components/modal/modal';

import { AuthService } from 'src/app/services/auth/auth-service';

import { RolService } from 'src/app/services/rol/rol';

import { TouchedDirective } from '../../theme/shared/directives/touched.directive';

//#region Interfaces
export interface IRol {
  rolId?: number;
  rolNombre: string;
}

export interface AccionTabla<T> {
  icon: string;
  color: string;
  callback: (item: T) => void;
  title?: string;
}
//#endregion



@Component({
  selector: 'app-rol',
  imports: [CommonModule, HttpClientModule, CardComponent, Grid, SpinnerComponent, Modal,
    TouchedDirective
  ],
  templateUrl: './rol.html',
  styleUrl: './rol.scss'
})
export class Rol implements OnInit {

  //#region STATE
  modalVisible = false;
  spinnerVisible = signal(false);

  rol = signal<IRol[]>([]);
  editandoId = signal<number | null>(null);

  nombre = signal<string>('');
  catIdEstado = signal<number | null>(1);
  estado = signal<string>('1');

  modo = signal<'nuevo' | 'editar'>('nuevo');

  nombreTocado = signal<boolean>(false);

  //Filtro para DataTable
  filtro = signal<string>('');
  tiposFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.rol();
    return this.rol().filter((t) => t.rolNombre?.toLowerCase().includes(f));
  });

  tituloModal = computed(() => (this.modo() === 'nuevo' ? 'Nuevo Rol' : 'Actualizar Rol'));
  //#endregion

  //#region TABLE
  columnas = [
    { header: 'IdRol', field: 'rolId' },
    { header: 'Nombre Rol', field: 'rolNombre' },
    { header: 'Estado', field: 'rolEstadoDesc' },
    { header: 'Acciones', field: 'acciones' }
  ];

  accionesTabla: AccionTabla<IRol>[] = [
    { icon: 'fas fa-edit', title: 'Editar', color: '#3d5bbe', callback: (item) => this.seleccionarParaEditar(item) },
    { icon: 'fas fa-trash', title: 'Eliminar', color: '#dc3545', callback: (item) => this.eliminar(item) }
  ];
  //#endregion

  constructor(
    private rolService: RolService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }


  //#region MÉTODOS
    cargarLista(): void {
      this.spinnerVisible.set(true);

      this.rolService
        .obtenerTodos()
        .pipe(
          finalize(() => {
            this.spinnerVisible.set(false);
          })
        )
        .subscribe({
          next: (res) => {
            if (res.isSuccess && res.data) {
              this.rol.set(res.data);
            } else {
              Swal.fire('Error', res.message || 'Error desconocido', 'error');
            }
          },
          error: (err) => {
            Swal.fire('Error', err.error?.message || 'Error al cargar información', 'error');
          }
        });
    }

    seleccionarParaEditar(item: IRol): void {
      this.modo.set('editar');
      this.editandoId.set(item.rolId ?? null);
      console.log(item.rolId);
      this.nombre.set(item.rolNombre);
      this.itemsTocado(false);
      this.modalVisible = true;
    }


    itemsTocado(valor :boolean){
      this.nombreTocado.set(valor);
    }

    limpiarCampos(): void {
      this.editandoId.set(null);
      this.nombre.set('');

      this.itemsTocado(false);
    }

    guardar(): void {
      this.itemsTocado(true);
      if (
        !this.nombre()
      ) {
        Swal.fire('Error', 'Debe completar todos los campos', 'warning');
        return;
      }

      const payload: IRol = {
        rolId: this.editandoId() ?? undefined,
        rolNombre: this.nombre()
      };

      this.spinnerVisible.set(true);

      console.log(this.editandoId())
      const obs = this.editandoId() !== null ? this.rolService.actualizar(payload) : this.rolService.guardar(payload);

      obs.subscribe({
        next: (res) => {
          this.spinnerVisible.set(false);
          if (res.isSuccess) {
            Swal.fire('Éxito', this.editandoId() ? 'Actualizado correctamente' : 'Registrado correctamente', 'success');
            this.cargarLista();
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

    eliminar(item: IRol): void {
      Swal.fire({
        title: '¿Eliminar Rol?',
        text: `¿Estás seguro de eliminar a ${item.rolNombre}? Esta acción no se puede revertir.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar'
      }).then((result) => {
        console.log('Item a eliminar:', item);
        if (result.isConfirmed && item.rolId) {
          this.spinnerVisible.set(true);
          this.rolService.eliminar(item.rolId).subscribe({
            next: (res) => {
              this.spinnerVisible.set(false);
              if (res.isSuccess) {
                Swal.fire('Eliminado', 'Registro eliminado', 'success');
                this.cargarLista();
              }
            },
            error: () => {
              this.spinnerVisible.set(false);
              Swal.fire('Error', 'No se pudo eliminar', 'error');
            }
          });
        }
      });
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
