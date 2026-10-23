import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { User } from '../types/user';

@Component({
  imports: [Nav, Home],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly accountService = inject(AccountService);

  protected readonly title = signal('Dating App');
  members = signal<User[]>([]);

    async ngOnInit() {
   this.members.set(await this.getMembers());
   this.setCurrentUser();
  }

  async getMembers(){
    try{
      return lastValueFrom(this.http.get<User[]>('https://localhost:7122/api/members'));
    }catch(error){
      console.error('Failed to load members:', error);
      throw error;
    }
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
