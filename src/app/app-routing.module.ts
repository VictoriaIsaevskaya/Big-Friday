import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./layout/footer/footer.module').then(m => m.FooterModule)
  },
  {
    path: 'events/:activityType',
    loadChildren: () => import('./pages/events/list/events.module').then(m => m.EventsPageModule)
  },
  {
    path: 'event-details/:eventId',
    loadChildren: () => import('./pages/events/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
