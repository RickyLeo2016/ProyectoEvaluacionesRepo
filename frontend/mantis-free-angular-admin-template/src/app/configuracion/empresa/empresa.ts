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

//#region Interfaces
export interface IEmpresa {
  empId?: number;
  empNombre: string;
  empRuc: string;
  empDireccion: string;
  empEstadoDesc: string;
  empEstado: string;
  usuIdReg: number;
}

export interface AccionTabla<T> {
  icon: string;
  color: string;
  callback: (item: T) => void;
  title?: string;
}
//#endregion

@Component({
  selector: 'app-empresa',
  imports: [
    CommonModule,
    HttpClientModule,
    CardComponent,
    Grid,
    SpinnerComponent,
    Modal
  ],
  templateUrl: './empresa.html',
  styleUrl: './empresa.scss'
})
export class Empresa implements OnInit {

  //#region STATE
  modalVisible = false;
  spinnerVisible = signal(false);

  empresa = signal<IEmpresa[]>([]);
  
  nombre = signal<string>('');
  ruc = signal<string>('');
  direccion = signal<string>('');
  estado = signal<string>('1');

  modo = signal<'nuevo' | 'editar'>('nuevo');
  editandoId = signal<number | null>(null);
  usuIdReg = signal<number>(1);

  rucTocado = signal<boolean>(false);
  nombreTocado = signal<boolean>(false);
  direccionTocado = signal<boolean>(false);

  filtro = signal<string>('');
  tiposFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.empresa();
    return this.empresa().filter(t =>
      t.empNombre?.toLowerCase().includes(f)
    );
  });

  tituloModal = computed(() => 
    this.modo() === 'nuevo' 
      ? 'Nueva Empresa' 
      : 'Actualizar Empresa'
  );
  //#endregion

  //#region TABLE
  columnas = [
    { header: 'ID', field: 'empId' },
    { header: 'Empresa', field: 'empNombre' },
    { header: 'Ruc', field: 'empRuc' },
    { header: 'Dirección', field: 'empDireccion' },
    { header: 'Estado', field: 'empEstadoDesc' },
    { header: 'Acciones', field: 'acciones' }
  ];
  
  accionesTabla: AccionTabla<IEmpresa>[] = [
    { icon: 'fas fa-edit', title: 'Editar', color: '#3d5bbe', callback: item => this.seleccionarParaEditar(item) },
    { icon: 'fas fa-trash', title: 'Eliminar', color: '#dc3545', callback: item => this.eliminar(item) }
  ];
  //#endregion

  constructor(
    private empService: EmpresaService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarListaEmpresa();
  }




  //#region MÉTODOS
  cargarListaEmpresa(): void {
   this.spinnerVisible.set(true);

  this.empService.obtenerTodos()
    .pipe(
      finalize(() => {
        this.spinnerVisible.set(false); 
      })
    )
    .subscribe({
      next: res => {
        if (res.isSuccess && res.data){
          this.empresa.set(res.data);
        } else {
          Swal.fire('Error', res.message || 'Error desconocido', 'error');
        }
      },
      error: err => {
        Swal.fire(
            'Error',
            err.error?.message || 'Error al cargar información',
            'error'
          );
      }
    });
  }

  seleccionarParaEditar(item: IEmpresa): void {
    this.modo.set('editar');
    this.editandoId.set(item.empId ?? null);
    this.nombre.set(item.empNombre);
    this.direccion.set(item.empDireccion);
    this.ruc.set(item.empRuc);
    this.estado.set(item.empEstadoDesc === 'Activo' ? '1' : '2');

    this.nombreTocado.set(false);
    this.direccionTocado.set(false);
    this.rucTocado.set(false);
    
    this.modalVisible = true;
  }

  limpiarCampos(): void {
    this.editandoId.set(null);
    this.ruc.set('');
    this.nombre.set('');
    this.direccion.set('');
    this.estado.set('A');
    
    this.rucTocado.set(false);
    this.nombreTocado.set(false);
    this.direccionTocado.set(false);
  }

  guardar(): void {
    this.rucTocado.set(true);
    this.nombreTocado.set(true);
    this.direccionTocado.set(true);

    if (!this.nombre() || !this.direccion() || !this.ruc()) {
      Swal.fire('Error', 'Debe completar todos los campos', 'warning');
      return;
    }

    const payload: IEmpresa = {
      empId: this.editandoId() ?? undefined,
      empRuc: this.ruc(),
      empNombre: this.nombre(),
      empDireccion: this.direccion(),
      empEstadoDesc: "",
      empEstado: this.estado(),
      usuIdReg: this.usuIdReg()
    };

    this.spinnerVisible.set(true);

    const obs = this.editandoId() !== null
      ? this.empService.actualizar(payload)
      : this.empService.guardar(payload);

    obs.subscribe({
      next: res => {
        this.spinnerVisible.set(false);
        if (res.isSuccess) {
          Swal.fire(
            'Éxito',
            this.editandoId() ? 'Actualizado correctamente' : 'Registrado correctamente',
            'success'
          );
          this.cargarListaEmpresa();
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
  
    eliminar(item: IEmpresa): void {
      Swal.fire({
        title: '¿Eliminar?',
        text: `¿Deseas eliminar ${item.empNombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar'
      }).then(result => {
        if (result.isConfirmed && item.empId) {
          this.spinnerVisible.set(true);
          this.empService.eliminar(item.empId).subscribe({
            next: res => {
              this.spinnerVisible.set(false);
              if (res.isSuccess) {
                Swal.fire('Eliminado', 'Registro eliminado', 'success');
                this.cargarListaEmpresa();
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
