import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from "./usuario/usuario.component";
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UsuarioComponent, LoginComponent, RegistroComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
  
})
export class AppComponent {
  title = 'angular-seminari6';
  loggedin: boolean = false;
  showRegisterForm: boolean = false;

  getLoggedIn(loggedin: boolean) {
    this.loggedin = loggedin;

    if (loggedin) {
      this.showRegisterForm = false;
    }
  }
}
