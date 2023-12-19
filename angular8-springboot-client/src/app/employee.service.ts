import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 // private baseUrl = 'http://localhost:8085/springboot-crud-rest/api/v1/employees';

 private baseUrl = 'http://localhost:8085/api/v1/employees';

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getLogin(email: string, password: string): Observable<Object> {
    const body: any = {
      emailId: email,
      password: password
    };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  storeUser(user: any): void {
    localStorage.setItem("user", user);
  }

  getUser(): any {
    return localStorage.getItem("user");
  }

  logout(): void {
    localStorage.clear();
  }

  getUserRole(): any {
    let role: any = null;
    const user = this.getUser();
    if ( user !== null) {
      role = JSON.parse(user).role;
    }
    return role;
  }
  forgetEmployeePassword(body: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/forgetpassword`, body);
  }


}
