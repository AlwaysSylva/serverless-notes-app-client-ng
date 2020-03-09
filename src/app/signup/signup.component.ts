import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from "aws-amplify";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form: FormGroup;
  confirmForm: FormGroup;
  private loading = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean>;
  newUser: any;

  get isLoading() {
    return this.loading.asObservable();
  }

  constructor(private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router) { 
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['']
    }, {validator: this.checkPasswords })
    this.confirmForm = this.fb.group({
      confirmationCode: ['', Validators.required]
    });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  async handleSubmit() {
    const value = this.form.value

    this.loading.next(true)

    try {
      const newUser = await Auth.signUp({
        username: value.email,
        password: value.password
      });
      this.loading.next(false);
      this.newUser = newUser;
    } catch (e) {
      alert(e.message);
      this.loading.next(false);
    }
  }

  async handleConfirmationSubmit() {
    const value = this.form.value
    const confirmationValue = this.confirmForm.value

    this.loading.next(true)

    try {
      await Auth.confirmSignUp(value.email, confirmationValue.confirmationCode);
      await Auth.signIn(value.email, value.password);
      this.authService.login();
      this.router.navigateByUrl('/');
    } catch (e) {
      alert(e.message);
      this.loading.next(false);
    }
  }

}
