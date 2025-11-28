import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Role, Utilisateur } from '../models';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  imports: [CommonModule, ButtonModule, ToolbarModule, AvatarModule]
})
export class TopbarComponent implements OnInit, OnDestroy {
  currentUser: Utilisateur | null = null;
  private subscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  goHome() {
    const role = this.currentUser?.role as Role | undefined;
    const target = role === 'ADMIN' ? ['/admin'] : ['/responsable'];
    this.router.navigate(target);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
