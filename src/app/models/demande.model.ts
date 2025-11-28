import { TypeDemande, StatusDemande } from './enums';
import { Utilisateur } from './utilisateur.model';

export interface Demande {
  idDemande?: number;
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  cat_professionel: string;
  created_at?: Date;
  updated_at?: Date;
  type: TypeDemande;
  application: string;
  motif: string;
  reponse?: string;
  status: StatusDemande;
  created_by?: Utilisateur;
  treated_by?: Utilisateur;
}

export interface DemandeCreationDTO {
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  cat_professionel: string;
  type: TypeDemande;
  application: string;
  motif: string;
  status: StatusDemande;
  createdById: number;
}

export interface DemandeModificationDTO {
  idDemande: number;
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  cat_professionel: string;
  type: TypeDemande;
  application: string;
  motif: string;
}

export interface DemandeAnswerDTO {
  idDemande: number;
  reponse: string;
  status: StatusDemande;
  treatedById: number;
}

export interface DemandeDTO {
  idDemande: number;
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  cat_professionel: string;
  created_at: Date;
  type: TypeDemande;
  application: string;
  status: StatusDemande;
}
