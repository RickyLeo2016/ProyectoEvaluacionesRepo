import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

import { finalize } from 'rxjs/operators';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Grid } from 'src/app/theme/shared/components/grid/grid';
import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';
import { Modal } from 'src/app/theme/shared/components/modal/modal';

import { RolService } from 'src/app/services/rol/rol';
import { UsuarioService } from 'src/app/services/usuario/usuario';
import { ViewChild, TemplateRef } from '@angular/core';

//#region Interfaces
export interface IUsuario {
  usuId?: number;
  usuNombre: string;
  usuEmail: string;
  usuDetDNI: string;
  usuNombres: string;
  usuApellidos: string;
  usuTelefono: string;
  usuCelular: string;
  empId: number;
  empNombre: string;
  catIdEstado: number;
  usuEstadoDesc: string;
}

export interface IUsuarioRol {
  usuRolId?: number;
  usuId: number;
  rolId: number;
  rolNombre: string;
  rolSelec: number;
}

export interface AccionTabla<T> {
  icon: string;
  color: string;
  callback: (item: T) => void;
  title?: string;
}
//#endregion

@Component({
  selector: 'app-usuarioRol',
  imports: [CommonModule, HttpClientModule, CardComponent, Grid, SpinnerComponent, Modal],
  templateUrl: './usuario-rol.html',
  styleUrl: './usuario-rol.scss'
})
export class UsuarioRol implements OnInit {
  @ViewChild('rolSelecTemplate', { static: true })
  rolSelecTemplate!: TemplateRef<any>;

  //#region STATE

  templatesGrid: any = {};

  modalVisible = false;
  spinnerVisible = signal(false);

  usuario = signal<IUsuario[]>([]);
  usuarioRol = signal<IUsuarioRol[]>([]);

  usuIdSeleccionado = signal<number | null>(0);

  editandoId = signal<number | null>(null);

  modo = signal<'nuevo' | 'editar'>('nuevo');

  //Filtro para DataTable
  filtro = signal<string>('');
  tiposFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.usuario();
    return this.usuario().filter((t) => t.empNombre?.toLowerCase().includes(f));
  });

  filtroRoles = signal<string>('');
  rolesFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.usuarioRol();
    return this.usuarioRol().filter((t) => t.rolNombre?.toLowerCase().includes(f));
  });

   tituloModal = computed(() => (this.modo() === 'nuevo' ? '??' : 'Asignar Roles Usuario'));
  //#endregion

  //#region TABLE
  columnas = [
    { header: 'Usuario', field: 'usuNombre' },
    { header: 'Empresa', field: 'empNombre' },
    { header: 'Estado', field: 'usuEstadoDesc' },
    { header: 'Asignar Roles', field: 'acciones' }
  ];

  accionesTabla: AccionTabla<IUsuario>[] = [
    { icon: 'fas fa-user-lock', title: 'Editar', color: '#3d5bbe', callback: (item) => this.asignarRoles(item) }
  ];

  columnasUsuarioRoles = [
    // { header: 'Rol ID', field: 'rolId' },
    { header: 'Rol Nombre', field: 'rolNombre' },
    { header: 'Activo', field: 'rolSelec', template: 'rolSelecTemplate' }
  ];

  //#endregion

  constructor(
    private rolService: RolService,
    private usuService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  ngAfterViewInit() {
    this.templatesGrid = {
      rolSelec: this.rolSelecTemplate
    };
  }

  onRolChange(item: any, event: any) {
    item.rolSelec = event.target.checked ? 1 : 2;
  }

  //#region MÉTODOS
  cargarLista(): void {
    this.spinnerVisible.set(true);

    this.usuService
      .obtenerTodos()
      .pipe(
        finalize(() => {
          this.spinnerVisible.set(false);
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isSuccess && res.data) {
            this.usuario.set(res.data);
          } else {
            Swal.fire('Error', res.message || 'Error desconocido', 'error');
          }
        },
        error: (err) => {
          Swal.fire('Error', err.error?.message || 'Error al cargar información', 'error');
        }
      });
  }

  cargarListaRoles(usuId: number): void {
    this.spinnerVisible.set(true);
    this.rolService
      .obtenerRolesPorUsuId(usuId)
      .pipe(
        finalize(() => {
          this.spinnerVisible.set(false);
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isSuccess && res.data) {
            this.usuarioRol.set(res.data);
          } else {
            Swal.fire('Error', res.message || 'Error desconocido', 'error');
          }
        },
        error: (err) => {
          Swal.fire('Error', err.error?.message || 'Error al cargar información', 'error');
        }
      });
  }

  asignarRoles(item: IUsuario): void {
    this.modo.set('editar');
    this.editandoId.set(item.usuId ?? null);
    if (item.usuId) {
      this.cargarListaRoles(item.usuId);
    }
    this.modalVisible = true;
  }

  limpiarCampos(): void {
    this.editandoId.set(null);
  }
  guardar(): void {
    const rolesPayload = this.rolesFiltrados().map((r) => ({
      rolId: r.rolId,
      rolSelec: r.rolSelec
    }));

    const payload = {
      usuId: this.editandoId(),
      roles: rolesPayload
    };

    this.spinnerVisible.set(true);

    this.rolService.assignRoles(payload).subscribe({
      next: (res) => {
        this.spinnerVisible.set(false);

        if (res.isSuccess) {
          this.cerrarModal();
          Swal.fire('Éxito', 'Roles actualizados correctamente', 'success');
        } else {
          this.cerrarModal();
          Swal.fire('Error', res.message || 'Error al guardar roles', 'error');
        }
      },
      error: () => {
        this.spinnerVisible.set(false);
        Swal.fire('Error', 'Error al guardar roles', 'error');
      }
    });
  }

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
