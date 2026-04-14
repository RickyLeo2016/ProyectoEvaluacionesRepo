import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavigationItem } from 'src/app/theme/layouts/admin-layout/navigation/navigation';


export interface Menu {
  menId?: number;
  menNombre:string;
  menIcono:string;
  menRuta:string;
  menPadreId: number;
  menOrden: number;
  // menEstadoDesc : string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
  errors: any;
}


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = `${environment.apiBaseUrl}/Menu`;

  private _menus = signal<NavigationItem[]>([]);
  menus$ = this._menus.asReadonly();

  constructor(private http: HttpClient) {}

  obtenerTodos(pageNumber: number = 1, pageSize: number = 100): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/ListarMenu?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }
 

 


  obtenerMenuPorRol(rolId: number,  pageNumber: number = 1,  pageSize: number = 100): Observable<ApiResponse<any[]>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/ListarMenuRol/${rolId}`,
          { params }
    );
  }
 
  
  // Guardar un nuevo registro
  guardar(datos: Menu): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/RegistrarMenu`, datos);
  }

  // Actualizar un registro existente
  actualizar(datos: Menu): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/ActualizarMenu`, datos);
  }


    assignMenuRoles(payload: any): Observable<ApiResponse<boolean>> {
      return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/AsignarMenuRoles`,payload);
    }
  

  // ObtenerMenusPorUsuario() {
  //   return this.http.get<Menu[]>(`${this.apiUrl}/ObtenerMenusPorUsuario`).pipe(
  //     tap(menus => {
  //       sessionStorage.setItem('menus', JSON.stringify(menus));
  //     })
  //   );
  // }

   ObtenerMenusPorUsuario() {
    return this.http.get<any>(`${this.apiUrl}/ObtenerMenusPorUsuario`).pipe(
      tap(resp => {
        console.log('🔥 MENUS API RESPONSE:', resp);
        const mapped = this.mapMenus(resp.data);
        console.log('🔥 MENUS MAPPED:', mapped);
        this._menus.set(mapped); // 👈 aquí guardas en memoria reactiva
      })
    );
  }


  private mapMenus(menus: any[]): NavigationItem[] {

    const padres = menus.filter(m => m.menPadreId === null);

    return padres.map(padre => ({
      id: padre.menId.toString(),
      title: padre.menNombre,
      type: 'group',
      icon: padre.menIcono,
      children: menus
        .filter(h => h.menPadreId === padre.menId)
        .map(hijo => ({
          id: hijo.menId.toString(),
          title: hijo.menNombre,
          type: 'item',
          url: hijo.menRuta || '',
          icon: hijo.menIcono,
          classes: 'nav-item'
        }))
    }));
  }
}
