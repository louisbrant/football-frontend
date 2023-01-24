import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {TeamComponent} from "./team.component";
import {TeamProfileComponent} from "./components/team-profile/team-profile.component";
import {GoalTimesComponent} from "./components/goal-times/goal-times.component";
import {SeasonMatchStatsComponent} from "./components/season-match-stats/season-match-stats.component";
import {PerformanceSummaryComponent} from "./components/performance-summary/performance-summary.component";
import {TotalMatchGoalsComponent} from "./components/total-match-goals/total-match-goals.component";

const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    TeamComponent,
    TeamProfileComponent,
    GoalTimesComponent,
    SeasonMatchStatsComponent,
    PerformanceSummaryComponent,
    TotalMatchGoalsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class TeamModule { }
