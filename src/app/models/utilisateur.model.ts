import { Role } from './enums';
import { Demande } from './demande.model';
import { Service } from './departement.model';

export interface Utilisateur {
  idUser?: number;
  nom: string;
  prenom: string;
  cat_professionel: string;
  email: string;
  role: Role;
  login: string;
  password?: string;
  listeDemandeCrees?: Demande[];
  listeDemandesTraitesParIt?: Demande[];
  service?: Service;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Utilisateur;
}
