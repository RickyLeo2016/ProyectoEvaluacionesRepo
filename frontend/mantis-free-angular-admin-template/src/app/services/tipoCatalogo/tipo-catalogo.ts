import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TipoCatalogo {
  tipCatId?: number;
  tipCatDescripcion: string;
  tipCatEstado: string;
  usuIdReg: number;
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
export class TipoCatalogoService {
  private apiUrl = `${environment.apiBaseUrl}/TipoCatalogo`;

  constructor(private http: HttpClient) {}

  obtenerTodos(pageNumber: number = 1, pageSize: number = 100): Observable<ApiResponse<any[]>> {
    // const token = sessionStorage.getItem('token'); 
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}` 
    // });

    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/ListarTipoCatalogo?PageNumber=${pageNumber}&PageSize=${pageSize}`
      // ,
      // { headers } 
    );
  }

  // Guardar un nuevo registro
  guardar(tipo: TipoCatalogo): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/RegistrarTipoCatalogo`, tipo);
  }

  // Actualizar un registro existente
  actualizar(tipo: TipoCatalogo): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/EditarTipoCatalogo`, tipo);
  }

  // Eliminar un registro
  eliminar(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/EliminarTipoCatalogo/${id}`);
  }
}
