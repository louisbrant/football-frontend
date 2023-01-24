import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { LiveComponent } from "./live.component";
import { PastMatchComponent } from './past-match/past-match.component';
import { BookmakersOddComponent } from './bookmakers-odd/bookmakers-odd.component';
import { MatchStatsComponent } from './match-stats/match-stats.component';
import { RecentlyPlayedComponent } from './recently-played/recently-played.component';
import { H2hInterestingComponent } from './h2h-interesting/h2h-interesting.component';
import { TopPlayersComparisonComponent } from './top-players-comparison/top-players-comparison.component';
import { TeamPlayersComponent } from './team-players/team-players.component';
import { SeasonStatsComponent } from './season-stats/season-stats.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { TeamDiagramComponent } from './team-diagram/team-diagram.component';

const routes: Routes = [
  {
    path: '',
    component: LiveComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    LiveComponent,
    PastMatchComponent,
    BookmakersOddComponent,
    RecentlyPlayedComponent,
    TopPlayersComparisonComponent,
    MatchStatsComponent,
    RecentlyPlayedComponent,
    H2hInterestingComponent,
    TeamPlayersComponent,
    RecentlyPlayedComponent,
    SeasonStatsComponent,
    TeamInfoComponent,
    TeamDiagramComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class H2hModule { }
