import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { LoginCreds } from '../../types/user';

@Component({
  imports: [FormsModule],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  protected accountservice = inject(AccountService);
  protected loginCreds ={} as LoginCreds;
  
  login() {
    this.accountservice.login(this.loginCreds).subscribe({
      next :(response) =>{ 
        
        console.log('Result:', response);
        this.loginCreds.email='';
        this.loginCreds.password='';
      },
      error: (error) => console.log(error)
    })    
  }

  logout() {
    this.accountservice.logout();    
  }
}
