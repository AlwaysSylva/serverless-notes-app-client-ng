import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { Auth } from "aws-amplify";
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'notes-app-client-ng';
  isNavbarCollapsed = true;
  isAuthenticated$: Observable<boolean>;
  isAuthenticating$: Observable<boolean>;
  private authenticating = new BehaviorSubject<boolean>(true);

  get isAuthenticating() {
    return this.authenticating.asObservable();
  }

  constructor(private authService: AuthService, 
    private router: Router) {}

  async ngOnInit() {
    try {
      await Auth.currentSession();
      this.authService.login()
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.authenticating.next(false)
    this.isAuthenticated$ = this.authService.isAuthenticated;
  }

  async handleLogout() {
    await Auth.signOut();
    this.authService.logout()
    this.router.navigateByUrl('/login');
  }
}
