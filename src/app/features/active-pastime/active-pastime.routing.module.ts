import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ActivePastimeComponent} from "./active-pastime.component";

const routes: Routes = [
  {
    path: '',
    component: ActivePastimeComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ActivePastimeRoutingModule {}
