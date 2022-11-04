import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Nutzer} from "../types/nutzer";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    //const { username, email, password } = this.form;
    this.nutzer = this.form;
    console.log(this.nutzer);
    //this.nutzer.name = this.form.username;
    //this.nutzer.email = this.form.email;
    //this.nutzer.passwort = this.form.passwort;

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
