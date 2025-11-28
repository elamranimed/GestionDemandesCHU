export interface Demande {
  id: number;
  nomComplet: string;
  statut: 'En cours' | 'Terminé';
  createdAt: Date;
  lastUpdatedAt: Date;
}
