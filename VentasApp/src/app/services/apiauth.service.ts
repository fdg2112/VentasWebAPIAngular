import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Response } from "../models/response";
import { Usuario } from "../models/usuario";

const httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

@Injectable({ providedIn: "root"})


export class ApiAuthService {
    url = 'https://localhost:5001/api/User/login/';

    private usuarioSubject!: BehaviorSubject<Usuario | null>;

    public get usuarioData(): Usuario | null {
        return this.usuarioSubject.value;
    }
    
    constructor( private _http: HttpClient) {
      this.usuarioSubject = new BehaviorSubject<Usuario | null>(
        JSON.parse(localStorage.getItem('usuario') || 'null')
      );     
    }

    login(email: string, password: string): Observable<Response<Usuario>> {
        return this._http.post<Response<Usuario>>(this.url, { email, password }, httpOptions).pipe(
          map(res => {
            if (res.exito === true) {
              const usuario: Usuario = res.datos;
              localStorage.setItem('usuario', JSON.stringify(usuario));
              this.usuarioSubject.next(usuario);
            }
            return res;
          })
        );
    }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
} 