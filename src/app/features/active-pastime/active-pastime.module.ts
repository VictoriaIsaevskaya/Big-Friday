import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivePastimeRoutingModule} from "./active-pastime.routing.module";
import {ActivePastimeComponent} from "./active-pastime.component";
import {HeaderComponent} from "../../layout/header/header.component";
import {ExploreContainerComponentModule} from "../../explore-container/explore-container.module";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [ActivePastimeComponent],
  imports: [CommonModule, ActivePastimeRoutingModule, HeaderComponent, ExploreContainerComponentModule, IonicModule]
})

export class ActivePastimeModule {}
