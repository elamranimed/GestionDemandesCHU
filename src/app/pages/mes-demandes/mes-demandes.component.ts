import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { StatusDemande } from '../../models/enums';
import { Demande, DemandeDTO } from '../../models';
import { DemandeService } from '../../service/demande.service';

@Component({
  selector: 'app-mes-demandes',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, CardModule, DialogModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MesDemandesComponent implements OnInit {
  readonly Status = StatusDemande;

  demandes: DemandeDTO[] = [];
  loading = false;
  errorMessage = '';

  // Dialog state
  viewDialogVisible = false;
  viewLoading = false;
  viewError = '';
  selectedDemande?: Demande;

  constructor(
    private demandeService: DemandeService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.fetchDemandes();
  }

  fetchDemandes(): void {
    this.loading = true;
    this.errorMessage = '';

    this.demandeService.getAllDemandes().subscribe({
      next: (demandes) => {
        this.demandes = (demandes ?? []).map((demande) => ({
          ...demande,
          created_at: demande.created_at ? new Date(demande.created_at) : new Date()
        }));
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message ?? 'Impossible de charger vos demandes.';
        this.loading = false;
      }
    });
  }

  get totalDemandes(): number {
    return this.demandes.length;
  }

  countByStatus(status: StatusDemande): number {
    return this.demandes.filter(d => d.status === status).length;
  }

  getSeverity(status: StatusDemande): 'info' | 'success' | 'danger' | 'warn' {
    switch (status) {
      case StatusDemande.TRAITEE:
        return 'success';
      case StatusDemande.REJETEE:
        return 'danger';
      case StatusDemande.SUPPRIMEE:
        return 'warn';
      default:
        return 'info';
    }
  }

  formatStatus(status: StatusDemande): string {
    switch (status) {
      case StatusDemande.RECU:
        return 'Reçue';
      case StatusDemande.TRAITEE:
        return 'Traitée';
      case StatusDemande.REJETEE:
        return 'Rejetée';
      case StatusDemande.SUPPRIMEE:
        return 'Supprimée';
      default:
        return status;
    }
  }
    onViewDemande(idDemande: number): void {
      this.viewDialogVisible = true;
      this.viewLoading = true;
      this.viewError = '';
      this.selectedDemande = undefined;

      this.demandeService.getDemandeById(idDemande).subscribe({
        next: (demande) => {
          this.selectedDemande = demande;
          this.viewLoading = false;
        },
        error: (error) => {
          this.viewError = error.error?.message ?? 'Impossible de charger la demande.';
          this.viewLoading = false;
        }
      });
    }

    closeViewDialog(): void {
      this.viewDialogVisible = false;
      this.selectedDemande = undefined;
      this.viewError = '';
      this.viewLoading = false;
    }

    onDeleteDemande(idDemande: number): void {
      this.confirmationService.confirm({
        message: 'Voulez-vous vraiment supprimer cette demande ? Cette action est irréversible.',
        header: 'Confirmation de suppression',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui, supprimer',
        rejectLabel: 'Annuler',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => {
          this.demandeService.deleteDemande(idDemande).subscribe({
            next: () => {
              this.fetchDemandes();
            },
            error: (error) => {
              this.errorMessage = error.error?.message ?? 'Impossible de supprimer la demande.';
            }
          });
        }
      });
    }
}
