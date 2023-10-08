import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { DASHBOARD_CARDS, DashboardCard } from "./dashboard-cards";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  dashboardCards: DashboardCard[] = DASHBOARD_CARDS

  constructor(private router: Router) {
  }

  goToActivity(link: string) {
    this.router.navigate(['/dashboard', link]);
  }
}
