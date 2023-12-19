import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  cpass: string = '';
  changeUserName: string = '';
  changePassword: string = '';
  changeConfirmPassword: string = '';
  errorMessage: string = '';
  showForgotPassword: boolean = false;
  isFormSubmitted: boolean = false;
  loginForm = new FormGroup<any>({});

  constructor(
    private router: Router,
    private empService: EmployeeService,
    private fb: FormBuilder
    ) {
      const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
      this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern(pattern)]],
        password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
      });
    }

  onSubmit() {
    this.errorMessage = '';
    const uName = this.loginForm.controls['username'].value;
    const passData = this.loginForm.controls['password'].value;
    this.empService.getLogin(uName, passData).subscribe((res: any) => {
      if (!!res && res.id) {
        this.empService.storeUser(JSON.stringify(res));
        this.router.navigate(['/employees']);
      } else if (res === null) {
        alert("Username and Password did not match.");
      }
    });
  }
  showForgotPasswordOverlay() {
    this.showForgotPassword = true;
  }
  hideForgotPasswordOverlay() {
    this.showForgotPassword = false;
   
    this.loginForm.controls['username'].setValue('');
    this.loginForm.controls['password'].setValue('');
    this.cpass = '';
  }
  hideForgotPassword() {
    this.showForgotPassword = false;
  }
  onForgotPasswordSubmit(): void {
    if (this.changeConfirmPassword !== this.changePassword) {
      alert("Change Password and Confirm Password not match");
      return;
    }
    const body: any = {
      emailId: this.changeUserName,
      password: this.changePassword
    };

    this.empService.forgetEmployeePassword(body).subscribe((res: any) => {
      console.log('>>>>>>>', res);
      if (!!res && res.id) {
        alert("Password successfully change.");
       
        this.loginForm.controls['username'].setValue('');
        this.loginForm.controls['pasword'].setValue('');
        this.showForgotPassword = false;
      }
    }, (error: any) => {
      alert("Error occured while forget password")
    });

  }
  resetForm() {
  }


}

