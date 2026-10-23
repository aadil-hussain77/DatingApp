import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { LoginCreds } from '../../types/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  imports: [FormsModule, RouterLink, RouterLinkActive],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  protected accountservice = inject(AccountService);
  private router=inject(Router);
  private toastService=inject(ToastService);
  protected loginCreds ={} as LoginCreds;
  
  login() {
    this.accountservice.login(this.loginCreds).subscribe({
      next :() =>{         
        this.loginCreds.email='';
        this.loginCreds.password='';
        this.toastService.success('login successfully',2000)
        this.router.navigateByUrl('members');
      },
      error: error=>{
        this.toastService.error(error.error,2000);
      }
    })    
  }

  logout() {
    this.accountservice.logout();
    this.router.navigateByUrl('/');
  }
}
