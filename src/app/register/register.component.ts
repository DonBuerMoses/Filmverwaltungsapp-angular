import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Nutzer} from "../types/nutzer";

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
   */
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Führt ein insert des Nutzers mit  den eingegebenen Daten durch.
   */
  onSubmit(): void {
    this.nutzer = this.form;
    console.log(this.nutzer);
    this.authService.register(this.nutzer).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
