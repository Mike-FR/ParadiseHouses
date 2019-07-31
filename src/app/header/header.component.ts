import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logged: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          this.logged = true;
        } else {
          this.logged = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
