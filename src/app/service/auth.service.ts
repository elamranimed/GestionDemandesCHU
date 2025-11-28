import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { LoginRequest, LoginResponse, Utilisateur, Role } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl ?? 'http://localhost:8080';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post(`${this.API_URL}/auth/login`, credentials).pipe(
      map(raw => this.normalizeLoginResponse(raw)),
      tap(response => {
        this.setToken(response.token);
        this.setUser(response.user);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  private normalizeLoginResponse(raw: any): LoginResponse {
    const userPayload =
      raw?.user ?? raw?.utilisateur ?? raw?.data?.user ?? raw?.data?.utilisateur ?? raw;

    if (!userPayload) {
      throw new Error('Réponse de connexion inattendue (utilisateur manquant)');
    }

    const normalizedRole =
      userPayload.role?.toString().toUpperCase() ?? (userPayload.role as string);

    const normalizedUser: Utilisateur = {
      ...userPayload,
      role: normalizedRole as Role
    };

    const token =
      raw?.token ?? raw?.accessToken ?? raw?.jwt ?? raw?.data?.token ?? `legacy-${Date.now()}`;

    return {
      token,
      user: normalizedUser
    };
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  setUser(user: Utilisateur): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUserFromStorage(): Utilisateur | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getCurrentUser(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }

  isResponsable(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'RESPONSABLE';
  }
}
