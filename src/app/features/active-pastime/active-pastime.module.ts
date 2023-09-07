import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";

import {ExploreContainerComponentModule} from "../../explore-container/explore-container.module";
import {HeaderComponent} from "../../layout/header/header.component";

import {ActivePastimePage} from "./active-pastime.page";
import {ActivePastimeRoutingModule} from "./active-pastime.routing.module";

@NgModule({
  declarations: [ActivePastimePage],
  imports: [CommonModule, ActivePastimeRoutingModule, HeaderComponent, ExploreContainerComponentModule, IonicModule]
})

export class ActivePastimeModule {}
