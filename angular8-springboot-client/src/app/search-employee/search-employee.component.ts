import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {
  employees:Employee[] = [];
  searchResult: Employee[] = [];
  searchKeyword: string = '';
  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.employeeService.getEmployeesList().subscribe((res: any) => {
      this.employees = res;
    });
  }

  getSearchEmployee(): void  {
    setTimeout(() => {
        if (this.searchKeyword === '') {
          this.searchResult = [];
        } else {
          //this.searchResult = this.employees.filter((item: Employee) => this.searchKeyword.includes(item?.firstName));
          this.searchResult = this.employees.filter((x) => x.firstName.includes(this.searchKeyword));
        }
    }, 500);
    
  }

}
