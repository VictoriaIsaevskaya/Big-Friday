import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
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
  {
    path: 'events',
    loadChildren: () => import('./features/active-pastime/active-pastime.module').then(m => m.ActivePastimeModule)
  },
  {
    path: 'passive',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'previous',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
