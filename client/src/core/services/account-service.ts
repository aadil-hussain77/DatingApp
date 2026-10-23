import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs/internal/operators/tap';

@Service()
export class AccountService {
    private readonly apiBaseUrl = 'https://localhost:7122/api/';
    private http = inject(HttpClient);
    public currentUser = signal<User | null>(null);

    register(registerCred :RegisterCreds)
    {
        return this.http.post<User>(this.apiBaseUrl + 'account/register',registerCred).pipe(
            tap(user => {
                this.setUser(user);
            })
        );
    }

    login(credentials: LoginCreds) {
        return this.http.post<User>(this.apiBaseUrl + 'account/login', credentials).pipe(
            tap(user => {
                this.setUser(user);
            })
        );
    }

    setUser(user :User)
    {
        localStorage.setItem('user', JSON.stringify(user));
                this.currentUser.set(user);
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }
}
