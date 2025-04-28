import { Injectable } from "@angular/core";
import { ApiAuthService } from "../services/apiauth.service";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

    constructor(private apiAuthService : ApiAuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("interceptor activado");
        const usuario = this.apiAuthService.usuarioData;
        console.log("Usuario desde interceptor", usuario);
        if (usuario) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.token}`
                }
            });
        }
        return next.handle(request);
    }

}