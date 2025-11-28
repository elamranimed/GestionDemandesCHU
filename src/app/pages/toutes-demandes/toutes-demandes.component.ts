import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Demande } from './toutes-demandes.model';

@Component({
  selector: 'app-toutes-demandes',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule],
  templateUrl: './toutes-demandes.component.html',
  styleUrls: ['./toutes-demandes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToutesDemandesComponent {
  demandes: Demande[] = [
    {
      id: 1,
      nomComplet: 'Ali Ben Salah',
      statut: 'En cours',
      createdAt: new Date('2023-10-13'),
      lastUpdatedAt: new Date('2023-10-20')
    },
    {
      id: 2,
      nomComplet: 'Sara El Amrani',
      statut: 'Terminé',
      createdAt: new Date('2023-10-14'),
      lastUpdatedAt: new Date('2023-10-21')
    }
  ];

  modifier(demande: Demande): void {
    console.log('Demande à modifier :', demande);
  }
}
