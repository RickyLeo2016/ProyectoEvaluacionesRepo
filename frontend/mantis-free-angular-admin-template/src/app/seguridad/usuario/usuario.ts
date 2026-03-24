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
import { EmpresaService } from 'src/app/services/empresa/empresa';
import { UsuarioService } from 'src/app/services/usuario/usuario';
import { IEmpresa } from '../../configuracion/empresa/empresa';

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
  // usuIdReg: number;
}

export interface AccionTabla<T> {
  icon: string;
  color: string;
  callback: (item: T) => void;
  title?: string;
}
//#endregion

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, HttpClientModule, CardComponent, Grid, SpinnerComponent, Modal],
  templateUrl: './usuario.html',
  styleUrl: './usuario.scss'
})
export class Usuario implements OnInit {
  //#region STATE
  modalVisible = false;
  spinnerVisible = signal(false);

  empresaList = signal<IEmpresa[]>([]);
  usuario = signal<IUsuario[]>([]);

  editandoId = signal<number | null>(null);

  nombre = signal<string>('');
  email = signal<string>('');
  identificacion = signal<string>('');
  nombres = signal<string>('');
  apellidos = signal<string>('');
  telefono = signal<string>('');
  celular = signal<string>('');
  correo = signal<string>('');
  empId = signal<number | null>(0);

  catIdEstado = signal<number | null>(1);
  estado = signal<string>('1');

  modo = signal<'nuevo' | 'editar'>('nuevo');
  // usuIdReg = signal<number>(0);

  empresaTocado = signal<boolean>(false);
  empresaSeleccionado = signal<string>('');

  identificacionTocado = signal<boolean>(false);
  nombresTocado = signal<boolean>(false);
  apellidosTocado = signal<boolean>(false);
  telefonoTocado = signal<boolean>(false);
  celularTocado = signal<boolean>(false);
  emailTocado = signal<boolean>(false);

  //Filtro para DataTable
  filtro = signal<string>('');
  tiposFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.usuario();
    return this.usuario().filter((t) => t.empNombre?.toLowerCase().includes(f));
  });

  tituloModal = computed(() => (this.modo() === 'nuevo' ? 'Nuevo Usuario' : 'Actualizar Usuario'));
  //#endregion

  //#region TABLE
  columnas = [
    // { header: 'ID', field: 'usuId' },
    { header: 'Identificación', field: 'usuDetDNI' },
    { header: 'Apellidos', field: 'usuApellidos' },
    { header: 'Nombres', field: 'usuNombres' },
    { header: 'Usuario', field: 'usuNombre' },
    { header: 'Empresa', field: 'empNombre' },
    { header: 'Estado', field: 'usuEstadoDesc' },
    { header: 'Acciones', field: 'acciones' }
  ];

  accionesTabla: AccionTabla<IUsuario>[] = [
    { icon: 'fas fa-edit', title: 'Editar', color: '#3d5bbe', callback: (item) => this.seleccionarParaEditar(item) },
    { icon: 'fas fa-trash', title: 'Eliminar', color: '#dc3545', callback: (item) => this.eliminar(item) }
  ];
  //#endregion

  constructor(
    private empService: EmpresaService,
    private usuService: UsuarioService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarLista();
    this.cargarEmpresasDrop();
  }

  cargarEmpresasDrop(): void {
    this.spinnerVisible.set(true);
    this.empService.obtenerTodos().subscribe({
      next: (res) => {
        if (res.isSuccess && res.data) this.empresaList.set(res.data);
        this.spinnerVisible.set(false);
      },
      error: (err) => {
        this.spinnerVisible.set(false);
        Swal.fire('Error', err.error?.message || 'Error cargando tipos', 'error');
        this.auth.logout();
      }
    });
  }

  onEmpresaChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.empId.set(Number(target.value));
    this.empresaTocado.set(true);
  }

  empresaValida(): boolean {
    const id = this.empId();
    return id !== null && id !== 0;
  }

  isEmailValido(): boolean {
    const valor = this.email();
    if (!valor) return false; // si está vacío, no es válido
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(valor);
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

  seleccionarParaEditar(item: IUsuario): void {
    this.modo.set('editar');
    this.editandoId.set(item.usuId ?? null);
    this.identificacion.set(item.usuDetDNI);
    this.nombres.set(item.usuNombres);
    this.apellidos.set(item.usuApellidos);
    this.telefono.set(item.usuTelefono);
    this.celular.set(item.usuCelular);
    this.empId.set(item.empId);
    this.email.set(item.usuEmail);
    // this.estado.set(item.empEstadoDesc === 'Activo' ? '1' : '2');
    this.itemsTocado(false);
    this.modalVisible = true;
  }


  itemsTocado(valor :boolean){
    this.identificacionTocado.set(valor);
    this.nombresTocado.set(valor);
    this.apellidosTocado.set(valor);
    this.telefonoTocado.set(valor);
    this.celularTocado.set(valor);
    this.empresaTocado.set(valor);
    this.emailTocado.set(valor);
  }

  limpiarCampos(): void {
    this.editandoId.set(null);
    this.identificacion.set('');
    this.nombres.set('');
    this.apellidos.set('');
    this.telefono.set('');
    this.celular.set('');
    this.empId.set(0);
    this.email.set('');
    this.estado.set('1');
    this.itemsTocado(false);
  }

  guardar(): void {
    this.itemsTocado(true);
    if (
      !this.email() ||
      !this.identificacion() ||
      !this.nombres() ||
      !this.apellidos() ||
      !this.telefono() ||
      !this.celular() ||
      !this.empId()
    ) {
      Swal.fire('Error', 'Debe completar todos los campos', 'warning');
      return;
    }

    const payload: IUsuario = {
      usuId: this.editandoId() ?? undefined,
      usuNombre: '',
      usuEmail: this.email(),
      usuNombres: this.nombres(),
      usuApellidos: this.apellidos(),
      usuDetDNI: this.identificacion(),
      usuTelefono: this.telefono(),
      usuCelular: this.celular(),
      empId: this.empId(),
      empNombre: '',
      catIdEstado: this.catIdEstado(),
      usuEstadoDesc: this.estado()
      // usuIdReg: this.usuIdReg()
    };

    this.spinnerVisible.set(true);

    const obs = this.editandoId() !== null ? this.usuService.actualizar(payload) : this.usuService.guardar(payload);

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

  eliminar(item: IUsuario): void {
    Swal.fire({
      title: '¿Eliminar Usuario?',
      text: `¿Estás seguro de eliminar a ${item.usuApellidos + ' ' + item.usuNombres}? Esta acción no se puede revertir.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      // console.log('Item a eliminar:', item);
      if (result.isConfirmed && item.usuId) {
        this.spinnerVisible.set(true);
        this.usuService.eliminar(item.usuId).subscribe({
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
