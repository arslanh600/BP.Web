import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BP.Web';
  userLoggedIn:Observable<boolean>; 
  constructor(private route:Router,private token:TokenService) {
  }
  ngOnInit(): void {
    this.userLoggedIn = this.token.isLoggedIn; 
  }
  signOut(){
    this.token.updateLoginStatus(false);
  }

}
