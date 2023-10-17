import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./layout/footer/footer.module').then(m => m.FooterModule)
  },
  {
    path: 'events/:activityType',
    loadChildren: () => import('./features/events/list/events.module').then(m => m.EventsPageModule)
  },
  {
    path: 'event-details/:eventId',
    loadChildren: () => import('./features/events/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/user-dashboard/dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./features/chats/chats/chats.module').then(m => m.ChatPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
