import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { TimetrackerComponent } from './timetracker/timetracker.component';
import { AuthGuard } from "./_guard/auth.guard";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard', canActivate: [AuthGuard], component:DashboardComponent},
  {path:'myaccount', component:MyaccountComponent},
  {path:'timetracker', canActivate: [AuthGuard], component:TimetrackerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
