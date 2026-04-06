import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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
  constructor(private http: HttpClient) {}

  obtenerTodos(pageNumber: number = 1, pageSize: number = 100): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/ListarMenu?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }
 

  
  // Guardar un nuevo registro
  guardar(datos: Menu): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/RegistrarMenu`, datos);
  }

  // Actualizar un registro existente
  actualizar(datos: Menu): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/ActualizarMenu`, datos);
  }

  // // Eliminar un registro
  // eliminar(id: number): Observable<ApiResponse<boolean>> {
  //   return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/EliminarRol/${id}`);
  // }
}
