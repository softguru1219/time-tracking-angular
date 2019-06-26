import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

    constructor(
        private _router: Router,
        public userservice:UserService
    ) {
    }

    ngOnInit(): void {
        localStorage.removeItem('currentUser');
        // this._router.navigate(['/login']);
        this.LogoutClick();
    }

    LogoutClick(){
      localStorage.removeItem('currentUser');
      this._router.navigate(['/login']);
    }
}