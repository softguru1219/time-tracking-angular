import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public  loginbg="loginbg.jpg"
  username: any;
  hide = true;
  password: string;
  emailid: any;
  pass: any;
  errMsg = null;
  role = null;

  constructor(
    public router:Router, 
    public userservice:UserService
  ) { }

  ngOnInit() {
    this.userservice.checkLogin();
  }

  registerClick(){
  this.router.navigate(['/register']);
  }

  LoginClick(){
    this.userservice.loginUser(this.username,this.pass).pipe(first())
      .subscribe(
        res => {
          localStorage.setItem('currentUser', JSON.stringify(res['user']));
          this.role = res['user']['role'];
          
          if (this.role == 2)
            this.router.navigate(['/dashboard']);
          else
            this.router.navigate(['/timetracker']);
        },
        error => {
          this.errMsg = error.error.message;
      }
    )
  }
}
