import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {ActivePastimePage} from "./active-pastime.page";

const routes: Routes = [
  {
    path: '',
    component: ActivePastimePage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ActivePastimeRoutingModule {}
