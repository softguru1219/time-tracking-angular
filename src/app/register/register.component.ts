import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signup: FormGroup;
  successMsg = null;
  errMsg = null;
  constructor(public router:Router,public userservice:UserService) {}

  ngOnInit() {
    this.createform();
  }
 
  loginClick(){
    this.router.navigate(['/login']);
  }
  private createform(){
    this.signup=new FormGroup({
      full_name: new FormControl('',[Validators.required]),
      uname:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',Validators.required),
      confirmpassword:new FormControl('',[Validators.required,this.equalto('password')]),
    });
  }
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;
      
      let isValid=control.root.value[field_name]==input
      if(!isValid) 
        return { 'equalTo': {isValid} }
      else 
        return null;
    };
  }

  RegisterClick(){
    this.userservice.RegiserApi(this.signup.value.full_name,this.signup.value.uname,this.signup.value.confirmpassword,this.signup.value.email).pipe(first())
      .subscribe(
        res => {
          this.router.navigate(['/login']);
        },
        error => {
          this.errMsg = error.error.message;
      }
    )
  }
}
