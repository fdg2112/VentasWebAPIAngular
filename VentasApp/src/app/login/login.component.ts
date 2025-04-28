import { Component } from '@angular/core';
import { ApiAuthService } from '../services/apiauth.service';
import { SharedModule } from '../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public email!: string;
  public password!: string;
  
  constructor( 
    public apiAuthService: ApiAuthService,
    private router: Router, 
  ) { 
    if (this.apiAuthService.usuarioData) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.apiAuthService.login(this.email, this.password).subscribe((response) => {
      if (response.exito === true) {
        this.router.navigate(['/']);
      }
    }, (error) => {
      console.error(error);
    });
  }
}
