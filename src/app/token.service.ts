import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private loggedInSubject = new BehaviorSubject<boolean>(false);

  
  baseUrl = 'https://localhost:7209/api/'
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl+'authentication/login', { username, password });
  }
  getTokenData() {
    return this.http.get(`${this.baseUrl}BLPToken`);
  }
  updateTokenData(cAddress:string)  {
    return this.http.post(`${this.baseUrl}BLPToken/calculate-supply`, {contractAddress:cAddress});
  }

  get isLoggedIn() {
    return this.loggedInSubject.asObservable();
  }
  updateLoginStatus(loggedIn:boolean) {
    if(loggedIn){
      const token = localStorage.getItem('token');
    }else{
      localStorage.removeItem('token');
    }
    this.loggedInSubject.next(loggedIn);
  }
}