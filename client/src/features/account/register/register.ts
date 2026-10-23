import { Component, inject, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  imports: [FormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  protected accountService= inject(AccountService);
  cancelRegister = output<boolean>();
  protected registerCred = {} as RegisterCreds;
  
  register() {
    this.accountService.register(this.registerCred).subscribe({
      next : response=>{
        console.log(response),
        this.cancel();
      },
      error : error=>{
        console.log(error);
      }
      
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
