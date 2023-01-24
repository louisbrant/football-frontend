import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { H2hComponent } from './components/h2h/h2h.component';
import { H2hTeamsComponent } from './components/h2h-teams/h2h-teams.component';
import { MatchstatComponent } from './components/matchstat/matchstat.component';
import { SeasonStatsGoalsScoringComponent } from './components/season-stats-goals-scoring/season-stats-goals-scoring.component';
import { SeasonStatsGoalsConceededComponent } from './components/season-stats-goals-conceeded/season-stats-goals-conceeded.component';
import { SeasonStatsCombinedComponent } from './components/season-stats-combined/season-stats-combined.component';
import { SeasonStatsTotalMatchComponent } from './components/season-stats-total-match/season-stats-total-match.component';
import { TeamsMatchStatsComponent } from './components/teams-match-stats/teams-match-stats.component';
import { TeamRecentlyPlayedComponent } from './components/team-recently-played/team-recently-played.component';
import { TopPlayersComparisonComponent } from './components/top-players-comparison/top-players-comparison.component';
import {SeasonStatsPerformanceComponent} from "./components/season-stats-performance/season-stats-performance.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    MainComponent,
    H2hComponent,
    H2hTeamsComponent,
    MatchstatComponent,
    SeasonStatsPerformanceComponent,
    SeasonStatsGoalsScoringComponent,
    SeasonStatsGoalsConceededComponent,
    SeasonStatsCombinedComponent,
    SeasonStatsTotalMatchComponent,
    TeamsMatchStatsComponent,
    TeamRecentlyPlayedComponent,
    TopPlayersComparisonComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
