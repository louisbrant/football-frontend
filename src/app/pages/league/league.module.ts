import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {LeagueComponent} from "./league.component";
import {LeagueInfoComponent} from "./components/league-info/league-info.component";
import {LeagueOverallStatsComponent} from "./components/league-overall-stats/league-overall-stats.component";
import {LeagueInterestingH2hComponent} from "./components/league-interesting-h2h/league-interesting-h2h.component";
import {LeagueFixturesComponent} from "./components/league-fixtures/league-fixtures.component";
import {LeagueResultsComponent} from "./components/league-results/league-results.component";

const routes: Routes = [
  {
    path: '',
    component: LeagueComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    LeagueComponent,
    LeagueInfoComponent,
    LeagueOverallStatsComponent,
    LeagueInterestingH2hComponent,
    LeagueFixturesComponent,
    LeagueResultsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class LeagueModule { }
