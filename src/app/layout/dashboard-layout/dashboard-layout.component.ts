import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../topbar.component';
import { SidebarComponent } from '../sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  imports: [RouterModule, TopbarComponent, SidebarComponent]
})
export class DashboardLayoutComponent {}
