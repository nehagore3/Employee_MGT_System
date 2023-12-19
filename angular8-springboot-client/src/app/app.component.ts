import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Employee Management System';
  isLoggedIn: boolean = false;
  isAdinLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private eservice: EmployeeService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
   //  filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (this.eservice.getUserRole() !== null && this.eservice.getUserRole() === "admin") {
          setTimeout(() => {
            this.isAdinLoggedIn = true;
            this.isLoggedIn = false;
          }, 100);
        } else if (this.eservice.getUserRole() !== null && this.eservice.getUserRole() === "user") { 
          setTimeout(() => {
            this.isAdinLoggedIn = false;
            this.isLoggedIn = true;
          }, 100);
        } else {
          this.isLoggedIn = false;
          this.isAdinLoggedIn = false;
        }
      }
    });
  }

  logout(): void {
    this.eservice.logout();
    this.router.navigate(['/home']);
  }
}
