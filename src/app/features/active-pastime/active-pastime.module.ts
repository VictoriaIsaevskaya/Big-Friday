import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivePastimeRoutingModule} from "./active-pastime.routing.module";
import {ActivePastimePage} from "./active-pastime.page";
import {HeaderComponent} from "../../layout/header/header.component";
import {ExploreContainerComponentModule} from "../../explore-container/explore-container.module";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [ActivePastimePage],
  imports: [CommonModule, ActivePastimeRoutingModule, HeaderComponent, ExploreContainerComponentModule, IonicModule]
})

export class ActivePastimeModule {}
