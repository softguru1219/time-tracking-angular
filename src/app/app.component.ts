import { Component, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ats';
  public route: any;

  constructor(public router: Router , public location:Location, public userservice:UserService){
    router.events.subscribe((val) => {
      this.route = location.path();
    });
  }

  logout(){
    // this.userservice.logout().pipe(first()).subscribe((res:any)=>{
    //   console.log(res);
    //   this.router.navigate(['/login']);
    // });
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
