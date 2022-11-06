import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {TokenStorageService} from "../services/token-storage.service";
import {Nutzer} from "../types/nutzer";

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
  //roles: string[] = [];
  name: string = "";
  private _nutzer: Nutzer;
  aktiverNutzer: any;

  get nutzer(): Nutzer {
    return this._nutzer;
  }

  set nutzer(value: Nutzer) {
    this._nutzer = value;
  }

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
      this.name = this.tokenStorage.getUser().name;
    }
  }

  /**
   * Versucht mit den eingegebenen Daten ein Login durchzuführen
   */
  onSubmit(): void {
    //const { name, passwort } = this.form;
    this.nutzer = {
      name: this.form.name,
      email: "",
      passwort: this.form.passwort
    };

    this.authService.login(this.nutzer).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.tokenStorage.getUser().roles;
        this.name = this.tokenStorage.getUser().name;
        this.reloadPage();
      },
      err => {
        console.log(err.error);
        this.errorMessage = err.error;
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

  /**
   * Benutzer wird wieder abgemeldet
   */
  logout(): void {
    this.tokenStorage.signOut();
    this.reloadPage();
  }
}
