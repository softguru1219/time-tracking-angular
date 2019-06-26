import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  checked: boolean;
  user_id: any;
  username: any;
  email: any;
  password: any;
  email_reminder: any;
  successMsg: any;
  errMsg: any;

  constructor(public router:Router,public userservice:UserService) { }

  ngOnInit() {
    this.get_current_user();
  }

  get_current_user() {
    var current_user = localStorage.getItem('currentUser');
    this.user_id = JSON.parse(current_user).id
    this.username = JSON.parse(current_user).username
    this.email = JSON.parse(current_user).email
  }
  isAnswerProvided(e) {
    if(this.checked == false){
        this.userservice.updated(this.user_id, this.username, this.password, 
          this.email,  this.checked).pipe(first())
        .subscribe(
          res => {
            this.successMsg = res['status'];
          }, 
          err => {
          }
        )
    }

    if(this.checked == true){
      this.userservice.updated(this.user_id, this.username, this.password, 
        this.email,  this.checked).pipe(first())
        .subscribe(
          res => {
            this.successMsg = res['status'];
          }, 
          err => {
            this.errMsg = err.error.message;
            
          }
        )
    }
  }

}
