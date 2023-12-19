import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginGuardService } from './guard/login-guard.service';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [LoginGuardService] },
  { path: 'add', component: CreateEmployeeComponent, canActivate: [LoginGuardService] },
  //{ path: 'add', component: CreateEmployeeComponent },
  { path: 'update/:id', component: UpdateEmployeeComponent, canActivate: [LoginGuardService] },
  { path: 'details/:id', component: EmployeeDetailsComponent, canActivate: [LoginGuardService] },
  { path: 'search', component: SearchEmployeeComponent, canActivate: [LoginGuardService] },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
