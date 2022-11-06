import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Nutzer} from "../types/nutzer";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Komponente ist für Registrierung zuständig
 */
export class RegisterComponent implements OnInit {
  form: Nutzer = {
    email: null,
    name: null,
    passwort: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  aktiverNutzer: any;
  private _nutzer: Nutzer;

  get nutzer(): Nutzer {
    return this._nutzer;
  }

  set nutzer(value: Nutzer) {
    this._nutzer = value;
  }

  /**
   * Konstruktor
   * @param authService
   * @param token
   */
  constructor(private authService: AuthService, private token: TokenStorageService) { }

  ngOnInit(): void {
    if (this.token.getUser().email === undefined) {
      console.log("Nicht angemeldet.");
    } else {
      this.aktiverNutzer = this.token.getUser();
    }
  }

  /**
   * Führt ein insert des Nutzers mit  den eingegebenen Daten durch.
   */
  onSubmit(): void {
    if(this.aktiverNutzer) {
      this.logout();
    }
    this.nutzer = this.form;
    console.log(this.nutzer);
    this.authService.register(this.nutzer).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.authService.login(this.nutzer).subscribe(
          data => {
            console.log(data);
            this.token.saveToken(data.accessToken);
            this.token.saveUser(data);

            //this.roles = this.tokenStorage.getUser().roles;
          },
          err => {
            console.log(err.error);
            this.errorMessage = err.error;
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  /**
   * Benutzer wird wieder abgemeldet
   */
  logout(): void {
    this.token.signOut();
    console.log('Abgemeldet.')
  }
}
