import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // POST /addNewUser - Ajouter un nouvel utilisateur
  addUser(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.API_URL}/addNewUser`, user);
  }

  // GET /users - Récupérer tous les utilisateurs (à implémenter côté backend si nécessaire)
  getAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.API_URL}/users`);
  }

  // GET /user/{id} - Récupérer un utilisateur par ID
  getUserById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.API_URL}/user/${id}`);
  }
}
