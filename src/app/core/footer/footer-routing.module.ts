import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterPage } from './footer.page';

const routes: Routes = [
  {
    path: '',
    component: FooterPage,
    children: [
      {
        path: 'active',
        loadChildren: () => import('../../features/active-pastime/active-pastime.module').then(m => m.ActivePastimeModule)
      },
      {
        path: 'passive',
        loadChildren: () => import('../../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'previous',
        loadChildren: () => import('../../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/events/active',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FooterRoutingModule {}
