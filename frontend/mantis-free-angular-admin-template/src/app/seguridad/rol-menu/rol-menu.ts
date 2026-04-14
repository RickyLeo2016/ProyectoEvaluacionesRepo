import { Component, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

import { finalize } from 'rxjs/operators';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Grid } from 'src/app/theme/shared/components/grid/grid';
import { SpinnerComponent } from 'src/app/theme/shared/components/spinner/spinner.component';

import { AuthService } from 'src/app/services/auth/auth-service';
import { RolService } from 'src/app/services/rol/rol';
import { MenuService } from 'src/app/services/menu/menu';

//#region Interfaces
export interface IMenu {
  menId?: number;
  menNombre: string;
  menRuta: string;
  menIcono: string;
  menOrden: number;
  menPadreId: number;
  menSelec: number;
}

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
  selector: 'app-rol-menu',
  imports: [CommonModule, HttpClientModule, CardComponent, Grid, SpinnerComponent],
  templateUrl: './rol-menu.html',
  styleUrl: './rol-menu.scss'
})
export class RolMenu implements OnInit {
  //#region STATE

  @ViewChild('menSelecTemplate', { static: true })
  menSelecTemplate!: TemplateRef<any>;


  templatesGrid: any = {};

  spinnerVisible = signal(false);

  botonHabilitado = computed(() => this.rolSeleccionado() !== null);

  rolSeleccionado = signal<IRol | null>(null);

  rolesFiltrados = signal<IRol[]>([]);
  mostrarDropdown = signal(false);

  nombreRol = signal<string>('');
  nombreRolTocado = signal<boolean>(false);

  onMenuChange(item: any, event: any) {
    item.menSelec = event.target.checked ? 1 : 2;
  }

  ngAfterViewInit() {
    this.templatesGrid = {
      menSelec: this.menSelecTemplate
    };
  }

  rol = signal<IRol[]>([]);
  editandoId = signal<number | null>(null);

  menu = signal<IMenu[]>([]);
  //Filtro para DataTable
  filtro = signal<string>('');
  menusFiltrados = computed(() => {
    const f = this.filtro().toLowerCase();
    if (!f) return this.menu();
    return this.menu().filter((t) => t.menNombre?.toLowerCase().includes(f));
  });
  //#endregion

  //#region TABLE
  columnas = [
    { header: 'Nombre Menú', field: 'menNombre' },
    // { header: 'Ruta Menú', field: 'menRuta' },
    { header: 'Menú Padre', field: 'esPadre' },
    { header: 'Orden', field: 'menOrden' },
    // { header: 'Estado', field: 'menEstadoDesc' },
      { header: 'Acceso', field: 'menSelec', template: 'menSelecTemplate' }
    // { header: 'Acciones', field: 'acciones' }
  ];

  constructor(
    private rolService: RolService,
    private menuService: MenuService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarRoles();
  }

  buscarRolesLocal(texto: string) {
    if (!texto) {
      this.rolesFiltrados.set([]);
      this.mostrarDropdown.set(false);
      return;
    }

    const filtrados = this.rol().filter((r) => r.rolNombre.toLowerCase().includes(texto.toLowerCase()));

    this.rolesFiltrados.set(filtrados);
    this.mostrarDropdown.set(filtrados.length > 0);
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.nombreRol.set(value);
    this.rolSeleccionado.set(null);
    this.menu.set([]);
    this.buscarRolesAutocomplete(value);
  }

  seleccionarRol(rol: IRol) {
    this.nombreRol.set(rol.rolNombre);
    this.rolSeleccionado.set(rol);
    this.cargarLista(rol.rolId);
    this.mostrarDropdown.set(false);
  }
  ocultarDropdown() {
    setTimeout(() => {
      this.mostrarDropdown.set(false);
    }, 200);
  }




  //#region MÉTODOS

  cargarRoles(): void {
    this.rolService.obtenerTodos().subscribe({
      next: (res) => {
        if (res.isSuccess && res.data) {
          this.rol.set(res.data);
        }
      }
    });
  }

  buscarRolesAutocomplete(texto: string): void {
    if (!texto || texto.length < 2) {
      this.rolesFiltrados.set([]);
      this.mostrarDropdown.set(false);
      return;
    }

    const filtrados = this.rol().filter((r) => r.rolNombre.toLowerCase().includes(texto.toLowerCase()));

    this.rolesFiltrados.set(filtrados);
    this.mostrarDropdown.set(filtrados.length > 0);
  }

  cargarLista(rolId: number): void {
    const rol = this.rolSeleccionado();
    this.spinnerVisible.set(true);
    this.menuService
      .obtenerMenuPorRol(rol.rolId)
      .pipe(finalize(() => this.spinnerVisible.set(false)))
      .subscribe({
        next: (res) => {
          if (res.isSuccess && res.data) {
            this.menu.set(res.data);
            this.templatesGrid = { ...this.templatesGrid };
          } else {
            Swal.fire('Error', res.message || 'Error desconocido', 'error');
          }
        },
        error: (err) => {
          Swal.fire('Error', err.error?.message || 'Error al cargar información', 'error');
        }
      });
  }
  limpiarCampos(): void {
    this.rol.set(null);
    this.nombreRol.set('');
  }


guardar(): void {
    const menusPayload = this.menusFiltrados().map((m) => ({
      menId: m.menId,
      menSelec: m.menSelec
    }));

    const payload = {
      rolId: this.rolSeleccionado()?.rolId,
      menus: menusPayload
    };

    this.spinnerVisible.set(true);

    this.menuService.assignMenuRoles(payload).subscribe({
      next: (res) => {
        this.spinnerVisible.set(false);

        if (res.isSuccess) {
          
          Swal.fire('Éxito', 'Menús actualizados correctamente', 'success');
        } else {
          
          Swal.fire('Error', res.message || 'Error al guardar permisos de menús', 'error');
        }
      },
      error: () => {
        this.spinnerVisible.set(false);
        Swal.fire('Error', 'Error al guardar los menús', 'error');
      }
    });
  }

  //#endregion
}
