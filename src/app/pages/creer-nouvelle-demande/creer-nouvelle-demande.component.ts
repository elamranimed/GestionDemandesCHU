import { Component, ElementRef, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TypeDemande, StatusDemande } from '../../models/enums';
import { DemandeCreationDTO } from '../../models';
import { DemandeService } from '../../service/demande.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-creer-nouvelle-demande',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './creer-nouvelle-demande.component.html',
  styleUrls: ['./creer-nouvelle-demande.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class CreerNouvelleDemandeComponent {
  @ViewChild('bulkFileInput') bulkFileInput?: ElementRef<HTMLInputElement>;
  private fb = inject(FormBuilder);

  demandeForm = this.fb.nonNullable.group({
    cin: ['', [Validators.required, Validators.minLength(6)]],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    cat_professionel: ['', Validators.required],
    type: [TypeDemande.CREATION, Validators.required],
    application: ['', Validators.required],
    motif: ['', [Validators.required, Validators.minLength(10)]]
  });

  mode: 'unique' | 'multiple' = 'unique';
  bulkFile: File | null = null;
  loading = false;
  uploading = false;

  private readonly allowedExtensions = ['.xlsx', '.xls', '.csv'];
  private readonly allowedMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv',
    'application/csv'
  ];

  readonly typeOptions = [
    { label: 'Création', value: TypeDemande.CREATION },
    { label: 'Modification', value: TypeDemande.MODIFICATION },
    { label: 'Désactivation', value: TypeDemande.DESACTIVATION }
  ];

  readonly categoryOptions = [
    { label: 'Médecin résident', value: 'MEDECIN_RESIDENT' },
    { label: 'Secrétaire médicale', value: 'SECRETAIRE' },
    { label: 'Technicien', value: 'TECHNICIEN' }
  ];

  readonly applicationOptions = [
    { label: 'SIH (Système Info Hospitalier)', value: 'SIH' },
    { label: 'Portail RH', value: 'PORTAIL_RH' },
    { label: 'VPN', value: 'VPN' }
  ];

  constructor(
    private demandeService: DemandeService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  enregistrerDemande(): void {
    if (this.demandeForm.invalid) {
      this.demandeForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Formulaire incomplet', detail: 'Merci de vérifier les champs requis.' });
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.idUser) {
      this.messageService.add({ severity: 'error', summary: 'Session invalide', detail: 'Utilisateur non authentifié.' });
      return;
    }

    const payload: DemandeCreationDTO = {
      ...this.demandeForm.getRawValue(),
      status: StatusDemande.RECU,
      createdById: currentUser.idUser
    } as DemandeCreationDTO;

    this.loading = true;
    this.demandeService.createDemande(payload).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Demande envoyée', detail: 'Votre demande est transmise à l’admin IT.' });
        this.demandeForm.reset({
          type: TypeDemande.CREATION
        });
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Échec de l’envoi',
          detail: error.error?.message ?? 'Impossible de créer la demande pour le moment.'
        });
      }
    });
  }

  setMode(mode: 'unique' | 'multiple'): void {
    if (this.mode === mode) {
      return;
    }
    this.mode = mode;
    if (mode === 'multiple') {
      this.demandeForm.reset({ type: TypeDemande.CREATION });
    } else {
      this.clearBulkSelection();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.clearBulkSelection();
      return;
    }

    const lowerName = file.name.toLowerCase();
    const hasValidExtension = this.allowedExtensions.some((ext) => lowerName.endsWith(ext));
    const hasValidMime = !!file.type && this.allowedMimeTypes.includes(file.type);

    if (!hasValidExtension && !hasValidMime) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Format non supporté',
        detail: 'Merci de fournir un fichier Excel ou CSV conforme au modèle.'
      });
      this.clearBulkSelection();
      return;
    }

    this.bulkFile = file;
  }

  submitBulkDemandes(): void {
    if (!this.bulkFile) {
      this.messageService.add({ severity: 'warn', summary: 'Aucun fichier', detail: 'Veuillez sélectionner un fichier à envoyer.' });
      return;
    }

    this.uploading = true;
    this.demandeService.uploadDemandesFile(this.bulkFile).subscribe({
      next: () => {
        this.uploading = false;
        this.messageService.add({ severity: 'success', summary: 'Fichier transmis', detail: 'Les demandes multiples ont été envoyées à l’admin.' });
        this.clearBulkSelection();
      },
      error: (error) => {
        this.uploading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Échec du chargement',
          detail: error.error?.message ?? 'Impossible de charger le fichier pour le moment.'
        });
      }
    });
  }

  private clearBulkSelection(): void {
    this.bulkFile = null;
    if (this.bulkFileInput?.nativeElement) {
      this.bulkFileInput.nativeElement.value = '';
    }
  }
}