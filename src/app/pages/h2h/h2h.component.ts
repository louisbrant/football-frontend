import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { H2hService } from "../../shared/services/h2h.service";
import { H2hTeams } from "../../shared/interfaces/h2hInteresting.interface";
import { forkJoin } from "rxjs";
import { TeamService } from "../../shared/services/team.service";
import { LeagueAndSeasons, SeasonsOfLeague, TopScorer } from "../../shared/interfaces/team-profile.interface";
import { LeagueAndSeasonsService } from "../../shared/services/leagueAndSeasons.service";
import { switchMap } from 'rxjs/operators';
import { LeagueService } from "../../shared/services/league.service";
import { Observable } from "rxjs";
import { LiveEventsService } from "../../shared/services/live-events.service";
import { MatchInterface } from "../../shared/interfaces/match.interface";

enum MatchType {
  LIVE = 'LIVE',
  HT = 'HT',
  FT = 'FT',
  ET = 'ET'
}

@Component({
  selector: 'app-h2h',
  templateUrl: './h2h.component.html',
  styleUrls: ['./h2h.component.scss']
})
export class H2hComponent implements OnInit {
  firstTeamId: number;
  secondTeamId: number;
  allMatches: H2hTeams[] | undefined;
  loading: boolean = false;
  curLeague!: number;
  curSeason!: number | undefined;
  seasons$: Observable<SeasonsOfLeague[]>;
  leagues: LeagueAndSeasons[] = [];
  firstTeam!: TopScorer;
  secondTeam!: TopScorer;
  isCurrentLeague!: boolean;
  matchData: MatchInterface | undefined;
  live: boolean = false;
  seasonIds: number[] = [];
  firstTeamForm?: { homeForm: string, awayForm: string };
  secondTeamForm?: { homeForm: string, awayForm: string };

  constructor(private readonly route: ActivatedRoute,
    private readonly h2hService: H2hService,
    private readonly _teamService: TeamService,
    private readonly _leagueAndSeasonsService: LeagueAndSeasonsService,
    private readonly leagueService: LeagueService,
    private readonly liveEventService: LiveEventsService) {
    this.firstTeamId = this.route.snapshot.params['firstTeamId'];
    this.secondTeamId = this.route.snapshot.params['secondTeamId'];
    this.seasons$ = this.leagueService.getSeason();
  }

  ngOnInit(): void {
    forkJoin([
      this._teamService.getSecondaryInfo(this.firstTeamId),
      this._teamService.getSecondaryInfo(this.secondTeamId),
      this._leagueAndSeasonsService.getLeagueAndSeasons(this.firstTeamId),
      this._leagueAndSeasonsService.getLeagueAndSeasons(this.secondTeamId),
      this.h2hService.firstTeamRecentlyPlayed(this.firstTeamId, true),
      this.h2hService.firstTeamRecentlyPlayed(this.secondTeamId, true),
    ]).subscribe((res: any) => {
      this.firstTeam = res[0];
      this.secondTeam = res[1];
      this.firstTeamForm = res[4];
      this.secondTeamForm = res[5];
      let leagueSeasons = res[2]?.concat(res[3]?.filter((item: any) => res[3].indexOf(item) < 0));
      const season = leagueSeasons.map((l: any) => l.seasons).map((s: any) => s.map((item: any) => item.seasonId));
      this.seasonIds = [].concat.apply([], season);
      this.leagues = leagueSeasons;
      this._teamService.leagueSeasons.next(leagueSeasons);
      this.curLeague = leagueSeasons[0].leagueId;
      this.leagueService.search(leagueSeasons[0].leagueName)
        .pipe(
          switchMap(res => {
            this.leagueService.league = res;
            return this.leagueService.seasonsOfLeague(res.id);
          }),
        )
        .subscribe(res => {
          if (this.leagueService?.league?.currentSeasonId) {
            this.isCurrentLeague = true;
          }
          this.leagueService.seasons.next(res);
        });
      this.getLeagues();
    })
    this.loading = true;
    this.h2hService.teamsH2h(this.firstTeamId, this.secondTeamId).subscribe(res => {
      this.allMatches = res;
    });
    this.liveEventService.getFixtures(this.firstTeamId).subscribe((res) => {
      const liveEvents = res;
      const match = liveEvents?.find(e => (+e.localTeam.id === +this.firstTeamId && +e.visitorTeam.id === +this.secondTeamId) || (+e.localTeam.id === +this.secondTeamId && +e.visitorTeam.id === +this.firstTeamId));
      if (match?.time?.status === (MatchType.LIVE) || (match?.time?.status === MatchType.ET) || (match?.time?.status === MatchType.FT) || (match?.time?.status === MatchType.HT) && Object.keys(match).length !== 0) {
        this.live = true;
        this.matchData = match;
      }
    })
  }
  private getLeagues() {
    this.getSeasons();
  }
  protected getSeasons() {
    const l: LeagueAndSeasons | undefined = this.leagues?.find(l => l.leagueId === this.curLeague);
    this.curSeason = l?.seasons[0]?.seasonId;
  }
}
