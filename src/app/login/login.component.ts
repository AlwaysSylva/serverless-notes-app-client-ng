import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { Auth } from "aws-amplify";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loading = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean>;
  form: FormGroup;

  get isLoading() {
    return this.loading.asObservable();
  }

  constructor(private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async handleSubmit() {
    const value = this.form.value

    this.loading.next(true)

    try {
      await Auth.signIn(value.email, value.password);
      this.authService.login();
      this.router.navigateByUrl('/');
    } catch (e) {
      alert(e.message);
      this.loading.next(false)
    }
  }

}
