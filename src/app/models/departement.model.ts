export interface Departement {
  idDepartement?: number;
  nom_Departement: string;
  services?: Service[];
}

export interface Service {
  idService?: number;
  nomService: string;
  departement?: Departement;
  users?: any[]; // Utilisateur[] cause circular dependency
}
