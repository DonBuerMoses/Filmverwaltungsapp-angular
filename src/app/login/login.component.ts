import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Komponente ist für Login zuständig
 */
export class LoginComponent implements OnInit {
  form: any = {
    name: null,
    passwort: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  /**
   * Konstruktor
   * @param authService
   * @param tokenStorage
   */
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  /**
   * Wird bei Initialisierung durchfeührt
   */
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  /**
   * Versucht mit den eingegebenen Daten ein Login durchzuführen
   */
  onSubmit(): void {
    const { name, passwort } = this.form;

    this.authService.login(name, passwort).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  /**
   * Seite wird neu geladen
   */
  reloadPage(): void {
    window.location.reload();
  }
}
