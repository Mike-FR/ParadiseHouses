import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ParadiseHouses';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDQc_d9RFVK39yAN2Mx5CiXU10tkFFUB7Q',
      authDomain: 'paradisehouses-51ab4.firebaseapp.com',
      databaseURL: 'https://paradisehouses-51ab4.firebaseio.com',
      projectId: 'paradisehouses-51ab4',
      storageBucket: '',
      messagingSenderId: '504918622408',
      appId: '1:504918622408:web:ca293ccbd2ac724d'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

}
