import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Role, Utilisateur } from '../models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    PanelModule,
    RippleModule,
    BadgeModule,
    DividerModule,
    TooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  totalDemandes = 24;
  totalPersonnel = 12;
  currentUser: Utilisateur | null = null;
  isAdmin = false;
  isResponsable = false;
  private subscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      const role = user?.role as Role | undefined;
      this.isAdmin = role === 'ADMIN';
      this.isResponsable = role === 'RESPONSABLE';
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}