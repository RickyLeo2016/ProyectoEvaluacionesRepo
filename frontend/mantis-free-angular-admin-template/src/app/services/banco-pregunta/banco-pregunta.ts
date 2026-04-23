import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface BancoPregunta {
  banPreId?: number;

  banPreVerId?: number;
  catIdTipo: number;
  tipoPreguntaDesc?: string;

  banPreVerPuntaje: number;
  banPreVerEnunciado: string;

  banPreVerDataSchema: string;
  banPreVerUiSchema?: string;

  banPreVerNumero?: number;
  fechaReg?: string;
}


export interface CrearBancoPreguntaRequest {
  catIdTipo: number;
  banPreVerPuntaje: number;
  banPreVerEnunciado: string;
  banPreVerDataSchema: string;
  banPreVerUiSchema?: string;
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
export class BancoPreguntaService {
 private apiUrl = `${environment.apiBaseUrl}/BancoPregunta`;

  constructor(private http: HttpClient) {}

  listarBancoPregunta(pageNumber: number = 1, pageSize: number = 100): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/ListarBancoPregunta?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }


  crear(payload: CrearBancoPreguntaRequest): Observable<ApiResponse<boolean>> {

      return this.http.post<ApiResponse<boolean>>(
        `${this.apiUrl}/CrearBancoPregunta`,
        payload
      );
    }


}
