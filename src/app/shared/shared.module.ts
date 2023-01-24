import { NgModule } from '@angular/core';
import { CompetitionStandingComponent } from "./components/competition-standing/competition-standing.component";
import { FixturesComponent } from "./components/fixtures/fixtures.component";
import { InterestingH2hComponent } from "./components/interesting-h2h/interesting-h2h.component";
import { LiveEventsComponent } from "./components/live-events/live-events.component";
import { MoreComponent } from "./components/more/more.component";
import { SearchComponent } from "./components/search/search.component";
import { SearchH2hComponent } from "./components/search-h2h/search-h2h.component";
import { StatsComponent } from "./components/stats/stats.component";
import { UpcomingMatchComponent } from "./components/upcoming-match/upcoming-match.component";
import { CupsPipe } from "./pipes/cups.pipe";
import { LastGamesPipe } from "./pipes/last-games.pipe";
import { CommonModule } from "@angular/common";
import { DetailedStatComponent } from './components/detailed-stat/detailed-stat.component';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { HeaderComponent } from "./components/header/header.component";
import { SelectLeagueComponent } from './components/select-league/select-league.component';
import { SelectYearComponent } from './components/select-year/select-year.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { SelectRangeComponent } from './components/select-range/select-range.component';
import { TeamPlayerStatsComponent } from "./components/team-player-stats/team-player-stats.component";
import { HomeTeamComponent } from './components/home-team/home-team.component';
import { AwayTeamComponent } from './components/away-team/away-team.component';
import { LeagueEmblemComponent } from './components/league-emblem/league-emblem.component';
import { UefaInfoComponent } from './components/uefa-info/uefa-info.component';
import { TeamComponent } from './components/team/team.component';
import { SubstitutionPipe } from './pipes/substitution.pipe';
import { TeamInterestingH2hComponent } from "./components/team-interesting-h2h/team-interesting-h2h.component";
import { ScoreComponent } from './components/score/score.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SortPipe } from "./pipes/sort.pipe";
import { PlayerStatsTableComponent } from "./components/player-stats-table/player-stats-table.component";
import { FixturesTableComponent } from "./components/fixtures-table/fixtures-table.component";
import { ResultTableComponent } from "./components/result-table/result-table.component";
import { ResultsComponent } from "./components/results/results.component";
import { RouterModule } from "@angular/router";
import { LineupsComponent } from "./components/lineups/lineups.component";
import { LiveComponent } from "./components/live/live.component";
import { MatchEventsComponent } from "./components/match-events/match-events.component";
import { LiveMatchStatComponent } from "./components/live-match-stat/live-match-stat.component";
import { BookmakerComponent } from "./components/Bookmaker/bookmaker.component";
import { ArrowTabComponent } from "./components/arrow-tab/arrow-tab.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  declarations: [
    HeaderComponent,
    CompetitionStandingComponent,
    FixturesComponent,
    InterestingH2hComponent,
    LiveEventsComponent,
    MoreComponent,
    TeamPlayerStatsComponent,
    ResultsComponent,
    SearchComponent,
    SearchH2hComponent,
    StatsComponent,
    UpcomingMatchComponent,
    CupsPipe,
    LastGamesPipe,
    DetailedStatComponent,
    LeagueTableComponent,
    SelectLeagueComponent,
    SelectYearComponent,
    HeaderComponentComponent,
    SelectRangeComponent,
    HomeTeamComponent,
    AwayTeamComponent,
    LeagueEmblemComponent,
    UefaInfoComponent,
    TeamComponent,
    TeamInterestingH2hComponent,
    SubstitutionPipe,
    ScoreComponent,
    PlayerStatsTableComponent,
    FixturesTableComponent,
    SortPipe,
    ResultTableComponent,
    LiveMatchStatComponent,
    LineupsComponent,
    MatchEventsComponent,
    LiveComponent,
    BookmakerComponent,
    ArrowTabComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    CompetitionStandingComponent,
    FixturesComponent,
    InterestingH2hComponent,
    LiveEventsComponent,
    MoreComponent,
    TeamPlayerStatsComponent,
    ResultsComponent,
    SearchComponent,
    SearchH2hComponent,
    StatsComponent,
    UpcomingMatchComponent,
    DetailedStatComponent,
    LeagueTableComponent,
    SelectLeagueComponent,
    SelectYearComponent,
    HeaderComponentComponent,
    SelectRangeComponent,
    HomeTeamComponent,
    AwayTeamComponent,
    LeagueEmblemComponent,
    UefaInfoComponent,
    TeamComponent,
    TeamInterestingH2hComponent,
    ScoreComponent,
    CupsPipe,
    LastGamesPipe,
    SubstitutionPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SortPipe,
    FixturesTableComponent,
    PlayerStatsTableComponent,
    ResultTableComponent,
    LiveMatchStatComponent,
    LineupsComponent,
    MatchEventsComponent,
    LiveComponent,
    BookmakerComponent,
    ArrowTabComponent,
    FooterComponent,
  ],
  providers: [],
})
export class SharedModule { }
