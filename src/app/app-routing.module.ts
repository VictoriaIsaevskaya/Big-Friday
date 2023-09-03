import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./core/footer/footer.module').then(m => m.FooterModule)
  },
  {
    path: 'events-list/:activityType',
    loadChildren: () => import('./features/events-list/events-list.module').then( m => m.EventsListPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
