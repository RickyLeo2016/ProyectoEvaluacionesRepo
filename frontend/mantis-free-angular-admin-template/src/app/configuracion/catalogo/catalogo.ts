import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Grid } from 'src/app/theme/shared/components/grid/grid';
import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';
import { Modal } from 'src/app/theme/shared/components/modal/modal';

import { CatalogoService } from 'src/app/services/catalogo/catalogo';
import { TipoCatalogoService } from 'src/app/services/tipoCatalogo/tipo-catalogo';
import { AuthService } from 'src/app/services/auth/auth-service';

/* =========================
        INTERFACES
========================= */
export interface ICatalogo {
  catId?: number;
  tipCatId?: number;
  catNombre: string;
  catDescripcion: string;
  catEstado: string;
  tipCatDescripcion?: string;
  usuIdReg: number;
}

export interface ITipoCatalogo {
  tipCatId?: number;
  tipCatDescripcion: string;
}

export interface AccionTabla<T> {
  icon: string;
  color: string;
  callback: (item: T) => void;
  title?: string;
}

/* =========================
        COMPONENT
========================= */
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CardComponent,
    Grid,
    SpinnerComponent,
    Modal
  ],
  templateUrl: './catalogo.html'
})
export class Catalogo implements OnInit {

  /* =========================
          STATE
  ========================== */
  modalVisible = false;
  spinnerVisible = signal(false); // ✔️ control de spinner

  tipos = signal<ICatalogo[]>([]);
  tipoCatalogoList = signal<ITipoCatalogo[]>([]);

  tipoSeleccionado = signal<string>('');
  nombre = signal<string>('');
  descripcion = signal<string>('');
  estado = signal<string>('A');
  editandoId = signal<number | null>(null);
  usuIdReg = signal<number>(1);

  tipoTocado = signal<boolean>(false);
  nombreTocado = signal<boolean>(false);
  descripcionTocado = signal<boolean>(false);

  filtro = signal<string>('');
  tiposFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.tipos();
    return this.tipos().filter(t =>
      t.tipCatDescripcion?.toLowerCase().includes(f)
    );
  });

  /* =========================
          TABLE
  ========================== */
  columnas = [
    { header: 'ID', field: 'catId' },
    { header: 'Tipo Catálogo', field: 'tipCatDescripcion' },
    { header: 'Catálogo', field: 'catNombre' },
    { header: 'Descripción', field: 'catDescripcion' },
    { header: 'Estado', field: 'catEstado' },
    { header: 'Acciones', field: 'acciones' }
  ];

  accionesTabla: AccionTabla<ICatalogo>[] = [
    { icon: 'fas fa-edit', title: 'Editar', color: '#3d5bbe', callback: item => this.seleccionarParaEditar(item) },
    { icon: 'fas fa-trash', title: 'Eliminar', color: '#dc3545', callback: item => this.eliminar(item) }
  ];

  /* =========================
        CONSTRUCTOR
  ========================== */
  constructor(
    private catService: CatalogoService,
    private tipCatService: TipoCatalogoService,
    private auth: AuthService
  ) {}

  /* =========================
        LIFECYCLE
  ========================== */
  ngOnInit(): void {
    this.cargarListaCatalogo();
    this.cargarTipoCatalogoDrop();
  }

  /* =========================
        MODAL
  ========================== */
  abrirModal(): void { this.modalVisible = true; }
  cerrarModal(): void { this.modalVisible = false; this.limpiarCampos(); }

  /* =========================
        DATA LOAD
  ========================== */
  cargarListaCatalogo(): void {
    this.spinnerVisible.set(true);
    this.catService.obtenerTodos().subscribe({
      next: res => {
        if (res.isSuccess && res.data) this.tipos.set(res.data);
        else Swal.fire('Error', res.message || 'Error desconocido', 'error');
        this.spinnerVisible.set(false);
      },
      error: err => {
        this.spinnerVisible.set(false);
        Swal.fire('Error', err.error?.message || 'Error cargando catálogos', 'error');
        this.auth.logout();
      }
    });
  }

  cargarTipoCatalogoDrop(): void {
    this.spinnerVisible.set(true);
    this.tipCatService.obtenerTodos().subscribe({
      next: res => {
        if (res.isSuccess && res.data) this.tipoCatalogoList.set(res.data);
        this.spinnerVisible.set(false);
      },
      error: err => {
        this.spinnerVisible.set(false);
        Swal.fire('Error', err.error?.message || 'Error cargando tipos', 'error');
        this.auth.logout();
      }
    });
  }

  onTipoChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.tipoSeleccionado.set(value);
    this.tipoTocado.set(true);
  }

  /* =========================
        EDITAR
  ========================== */
  seleccionarParaEditar(item: ICatalogo): void {
    this.editandoId.set(item.catId ?? null);
    this.nombre.set(item.catNombre);
    this.descripcion.set(item.catDescripcion);
    this.estado.set(item.catEstado === 'Activo' ? 'A' : 'I');
    this.tipoSeleccionado.set(String(item.tipCatId));

    this.tipoTocado.set(false);
    this.nombreTocado.set(false);
    this.descripcionTocado.set(false);

    this.modalVisible = true;
  }

  limpiarCampos(): void {
    this.editandoId.set(null);
    this.nombre.set('');
    this.descripcion.set('');
    this.estado.set('A');
    this.tipoSeleccionado.set('');
    this.tipoTocado.set(false);
    this.nombreTocado.set(false);
    this.descripcionTocado.set(false);
  }

  /* =========================
        GUARDAR
  ========================== */
  guardar(): void {
    this.tipoTocado.set(true);
    this.nombreTocado.set(true);
    this.descripcionTocado.set(true);

    if (!this.nombre() || !this.descripcion() || !this.tipoSeleccionado()) {
      Swal.fire('Error', 'Debe completar todos los campos', 'warning');
      return;
    }

    const payload: ICatalogo = {
      catId: this.editandoId() ?? undefined,
      tipCatId: Number(this.tipoSeleccionado()),
      catNombre: this.nombre(),
      catDescripcion: this.descripcion(),
      catEstado: this.estado(),
      usuIdReg: this.usuIdReg()
    };

    this.spinnerVisible.set(true);

    const obs = this.editandoId() !== null
      ? this.catService.actualizar(payload)
      : this.catService.guardar(payload);

    obs.subscribe({
      next: res => {
        this.spinnerVisible.set(false);
        if (res.isSuccess) {
          Swal.fire(
            'Éxito',
            this.editandoId() ? 'Actualizado correctamente' : 'Registrado correctamente',
            'success'
          );
          this.cargarListaCatalogo();
          this.cerrarModal();
        } else Swal.fire('Error', res.message || 'Error desconocido', 'error');
      },
      error: () => {
        this.spinnerVisible.set(false);
        Swal.fire('Error', 'Error al guardar', 'error');
      }
    });
  }

  /* =========================
        ELIMINAR
  ========================== */
  eliminar(item: ICatalogo): void {
    Swal.fire({
      title: '¿Eliminar?',
      text: `¿Deseas eliminar ${item.catNombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed && item.catId) {
        this.spinnerVisible.set(true);
        this.catService.eliminar(item.catId).subscribe({
          next: res => {
            this.spinnerVisible.set(false);
            if (res.isSuccess) {
              Swal.fire('Eliminado', 'Registro eliminado', 'success');
              this.cargarListaCatalogo();
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
}
