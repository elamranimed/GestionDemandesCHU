import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Demande,
  DemandeCreationDTO,
  DemandeModificationDTO,
  DemandeAnswerDTO,
  DemandeDTO
} from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private readonly API_URL = environment.apiUrl ?? 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // GET /demandes - Consulter toutes les demandes
  getAllDemandes(): Observable<DemandeDTO[]> {
    return this.http.get<DemandeDTO[]>(`${this.API_URL}/demandes`);
  }

  // GET /demande/{id} - Consulter une demande spécifique
  getDemandeById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.API_URL}/demande/${id}`);
  }

  // POST /sendDemande - Créer une nouvelle demande
  createDemande(demande: DemandeCreationDTO): Observable<DemandeCreationDTO> {
    return this.http.post<DemandeCreationDTO>(`${this.API_URL}/sendDemande`, demande);
  }

  // PUT /updateDemande/{id} - Modifier une demande
  updateDemande(id: number, demande: DemandeModificationDTO): Observable<DemandeModificationDTO> {
    return this.http.put<DemandeModificationDTO>(`${this.API_URL}/updateDemande/${id}`, demande);
  }

  // PUT /answerDemande/{id} - Répondre à une demande
  answerDemande(id: number, answer: DemandeAnswerDTO): Observable<DemandeAnswerDTO> {
    return this.http.put<DemandeAnswerDTO>(`${this.API_URL}/answerDemande/${id}`, answer);
  }

  // DELETE /anullerDemande/{id} - Annuler une demande
  deleteDemande(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/anullerDemande/${id}`);
  }

  // POST /upload_file - Charger un fichier Excel/CSV contenant plusieurs demandes
  uploadDemandesFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.API_URL}/upload_file`, formData, { responseType: 'text' });
  }
}
