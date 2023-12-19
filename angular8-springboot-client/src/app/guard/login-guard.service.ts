import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { EmployeeService } from '../employee.service';

@Injectable()
export class LoginGuardService implements CanActivate {
    constructor(public router: Router, private eservice: EmployeeService) {
    }

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }

    isAuthenticated() {
        return (this.eservice.getUserRole());
    }
}
