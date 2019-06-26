import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
import {HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseApi = null;
  constructor(
    private http:HttpClient, 
    public router:Router
  ) { }
  RegiserApi(full_name,username,password,email){
    this.baseApi = environment.apiUrl;
    // return this.http.post(this.baseApi + 'user/register',{username:username,password:password,email:email});
    return this.http.post(`${environment.apiUrl}user/register`,{full_name: full_name, username: username, password: password, email: email});
  }
  loginUser(username,password){
    return this.http.post(`${environment.apiUrl}user/login`,{username: username, password: password});
  }
  logout(){
    return this.http.get(`${environment.apiUrl}user/logout`,{});
  }
  updated(user_id, username, password, email, email_reminder){
    return this.http.put(`${environment.apiUrl}user/${user_id}/update`, {username: username, password: password, email: email, email_reminder: email_reminder});
  }
  getManager(seleted_week, view_number){
    return this.http.get(`${environment.apiUrl}manager/${view_number}/${seleted_week}`,{});
  }
  postInfo(postdata){
    return this.http.post(`${environment.apiUrl}user/info`, {postdata: postdata});
  }
  getInfo(user_id, current_date){
    return this.http.get(`${environment.apiUrl}user/info/${user_id}/${current_date}`);
  }
  checkLogin() {
    let user = localStorage.getItem('currentUser');
    if (user) {
      user = JSON.parse(user);
      let role = user['role'];
      if (role == 2){
        this.router.navigate(['/dashboard']);
      }
      else if (role == 1){
        this.router.navigate(['/timetracker']);
      };  
    }
  }
  weekRange(){
    return this.http.get(`${environment.apiUrl}manager/week_ranges`,{});
  }
}
