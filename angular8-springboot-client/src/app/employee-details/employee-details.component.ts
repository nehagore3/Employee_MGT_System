import { Employee } from '../employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
   doc = new jsPDF();
  id: number = 0;
  employee: Employee = new Employee();
  date:Date = new Date();
  maxDate: string = this.date.getFullYear()+"-"+("0" + (this.date.getMonth() +  1)).slice(-2);
  currentDate: string = this.date.getFullYear()+"-"+("0" + (this.date.getMonth() +  1)).slice(-2);
  basicSalary: number = 10000;
  houseAllownce: number = 2000;
  specialAllownce: number = 400;
  conveyance: number = 3000;
  addSpecialAllownce: number = 2000;
  shiftAllownce: number = 1000;
  bonus: number = 500;
  medicalAllownce: number = 600;
  PF: number = 0;
  professionTax: number = 200;
  incomeTax: number = 5000
  grossEarning: number = 0;
  grossDeduction: number = 0;
  netPay: number = 0;

  constructor(private route: ActivatedRoute, private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data)
        this.employee = data;
        this.basicSalary = (this.employee.salary * 60) / 100; // 60% of your salary
        this.grossEarning = (this.basicSalary + this.houseAllownce + this.specialAllownce + this.conveyance + this.addSpecialAllownce + this.shiftAllownce + this.bonus + this.medicalAllownce)
        this.PF = (this.grossEarning*12)/100;
        this.grossDeduction = this.PF + this.professionTax + this.incomeTax;
        this.netPay = this.grossEarning - this.grossDeduction;
      }, error => console.log(error));
  }

  list() {
    this.router.navigate(['employees']);
  }

  download(): void {
    const htmlData: any = this.getPaySleepHtml();
    this.doc.html(htmlData, {
      callback: function (doc) {
        doc.save('sample-document.pdf');
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 650
    });
  }

  getPaySleepHtml(): string {
    const date: any = document.getElementById('payslipdate');
    return `
    <html>
    <head>
    </head>
    <body>
    <table border="1" style='width: 100%;border-collapse:collapse;border: 1px solid black;'>
    <tr height="100px" style="background-color:#363636;color:#ffffff;text-align:center;font-size:24px; font-weight:600;">
    <td colspan='4'><img src='./assets/images/account.png' width="50px" height="50px" /> &nbsp;Employe Management System (Pay Slip)</td>
    </tr>
    <tr>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Employee Id:</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.employee.id}</td>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Name</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.employee.firstName + ' '+this.employee.lastName}</td>
    </tr>
    <tr>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Bank</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>Bhart Bank</td>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Month and year</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${date.value.split('-')[1]} / ${date.value.split('-')[0]}</td>
    </tr>
    <tr>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>PF No.</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>-</td>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;' >STD days</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>30</td>
    </tr>
    <tr>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Location</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.employee.address}</td>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Working Days</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>30</td>
    </tr>
   
    <tr>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Department</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.employee.department}</td>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Designation</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.employee.designation}</td>
    </tr>
    </table>
    <tr></tr>
    <br/>
    <table border="1" border="1" style='width: 100%;border-collapse:collapse;border: 1px solid black;'>
    <tr>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Earnings</th>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Amount</th>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Deductions</th>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Amount</th>
    </tr>
    <tr>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>Basic</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.basicSalary}</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>provident fund</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.PF}</td>
    </tr>
    <tr>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>House Rent Allowance</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.houseAllownce}</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>professional tax</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.professionTax}</td>
    </tr>
    <tr>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>special Allowance</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.specialAllownce}</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>Income tax</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.incomeTax}</td>
    </tr>
    <tr>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>conveyance</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.conveyance}</td>
    </tr>
    <tr>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>ADD Special allowance</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.addSpecialAllownce}</td>
    </tr>
    <tr>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>shift Allowance</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.shiftAllownce}</td>
    </tr>
    <tr>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>bonus</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.bonus}</td>
    </tr>
    <tr>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>medical Allowance</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>${this.medicalAllownce}</td>
    </tr>
    <tr>
    <th style='background-color:#fbc403; color:#363636;border-bottom: 1px solid black;'>Gross Earnings</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>Rs.${this.grossEarning}</td>
    <th >Gross Deductions</th>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>Rs.${this.grossDeduction}</td>
    </tr>
    <tr>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'></td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'><strong>NET PAY</strong></td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'>Rs.${this.netPay}</td>
    <td style='line-height:25px;padding-left:15px;border-bottom: 1px solid black;'></td>
    </tr>
    </table>
    </body>
    </html>
  `;
  }

  print(): void {
    const htmlData: any = this.getPaySleepHtml();
    this.doc.html(htmlData, {
      callback: function (doc) {
        doc.autoPrint();
        window.open(doc.output('bloburl').toString(), '_blank');
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 650
    });
  }
}
