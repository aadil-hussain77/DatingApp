import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected readonly members = signal<any>([]);

  // constructor() {
  //   this.http.get('https://localhost:5001/api/members').subscribe({
  //     next: (response) => console.log('Members:', response),
  //     error: (error) => console.error('Failed to load members:', error),
  //   });
  // }

  async ngOnInit() {
   this.members.set(await this.getMembers());
  }

  async getMembers(){
    try{
      return lastValueFrom(this.http.get('https://localhost:7122/api/members'));
    }catch(error){
      console.error('Failed to load members:', error);
      throw error;
    }
  }
}
