import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-personnel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-personnel.component.html',
  styleUrls: ['./liste-personnel.component.scss']
})
export class ListePersonnelComponent {
  user = {
    id_user: 1,
    nom: 'Mohamed',
    prenom: 'El Amrani',
    catProfessionnel: 'Medecin resident',
    email: 'mohamed@example.com',
    role: 'responsable'
  };
}
