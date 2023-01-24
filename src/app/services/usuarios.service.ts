import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rick } from '../interfaces/rick';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private http: HttpClient ) { }

  getChars( page: number, personaje: string ): Observable<Rick> {
    return this.http.get<Rick>(`https://rickandmortyapi.com/api/character/`,{
      params: {
        page,
        name: personaje
      }
    });
  }

}
