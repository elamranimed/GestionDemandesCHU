import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

interface PersonnelResponsable {
  id: number;
  nom: string;
  prenom: string;
  profil: string;
  email: string;
  statut: 'ACTIF' | 'INACTIF';
}

@Component({
  selector: 'app-personnels-responsable',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, CardModule],
  templateUrl: './personnels-responsable.component.html',
  styleUrls: ['./personnels-responsable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonnelsResponsableComponent {
  personnels: PersonnelResponsable[] = [
    {
      id: 1,
      nom: 'Benali',
      prenom: 'Aya',
      profil: 'Médecin résident',
      email: 'aya.benali@example.com',
      statut: 'ACTIF'
    },
    {
      id: 2,
      nom: 'Haddad',
      prenom: 'Karim',
      profil: 'Secrétaire médicale',
      email: 'karim.haddad@example.com',
      statut: 'INACTIF'
    }
  ];

  getSeverity(statut: PersonnelResponsable['statut']): 'success' | 'danger' {
    return statut === 'ACTIF' ? 'success' : 'danger';
  }

  get totalPersonnels(): number {
    return this.personnels.length;
  }

  countActive(): number {
    return this.personnels.filter(p => p.statut === 'ACTIF').length;
  }
}
