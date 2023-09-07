import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./core/footer/footer.module').then(m => m.FooterModule)
  },
  {
    path: 'events/:activityType',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
