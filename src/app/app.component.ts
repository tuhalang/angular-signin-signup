import { Component } from '@angular/core';
import { User } from './model/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (! this.currentUser){
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/products']);
    }
  }


}
