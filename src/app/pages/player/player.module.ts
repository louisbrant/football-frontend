import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {PlayerComponent} from "./player.component";
import {PlayerProfileComponent} from "./components/player-profile/player-profile.component";
import {PlayerStatComponent} from "./components/player-stat/player-stat.component";
import {CompareWithComponent} from "./components/compare-with/compare-with.component";

const routes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    PlayerComponent,
    PlayerProfileComponent,
    PlayerStatComponent,
    CompareWithComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class PlayerModule { }
