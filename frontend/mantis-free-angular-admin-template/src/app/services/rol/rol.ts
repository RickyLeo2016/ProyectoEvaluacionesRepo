import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Rol {
  rolId?: number;
  rolNombre:string;
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
export class RolService {
  private apiUrl = `${environment.apiBaseUrl}/Rol`;

  constructor(private http: HttpClient) {}

  obtenerTodos(pageNumber: number = 1, pageSize: number = 100): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/ListarRol?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  }

  // Guardar un nuevo registro
  guardar(tipo: Rol): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/RegistrarRol`, tipo);
  }

  // Actualizar un registro existente
  actualizar(tipo: Rol): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/ActualizarRol`, tipo);
  }

  // Eliminar un registro
  eliminar(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/EliminarRol/${id}`);
  }
}
