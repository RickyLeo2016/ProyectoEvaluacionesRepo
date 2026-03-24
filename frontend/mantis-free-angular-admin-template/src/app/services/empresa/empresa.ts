import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Empresa {
  empId?: number;
  empNombre: string;
  empRuc: string;
  empDireccion: string;
  empEstado: string;
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
export class EmpresaService {
  private apiUrl = `${environment.apiBaseUrl}/Empresa`;

  constructor(private http: HttpClient) {}

  obtenerTodos(pageNumber: number = 1, pageSize: number = 100): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/ListarEmpresa?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }

  // Guardar un nuevo registro
  guardar(tipo: Empresa): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/RegistrarEmpresa`, tipo);
  }

  // Actualizar un registro existente
  actualizar(tipo: Empresa): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/ActualizarEmpresa`, tipo);
  }

  // Eliminar un registro
  eliminar(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/EliminarEmpresa/${id}`);
  }
}
