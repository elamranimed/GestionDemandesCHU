import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichierService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // POST /upload_file - Upload un fichier Excel
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.API_URL}/upload_file`, formData, { responseType: 'text' });
  }

  // GET /download_file/{id} - Télécharger un fichier Excel
  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.API_URL}/download_file/${id}`, { responseType: 'blob' });
  }
}
