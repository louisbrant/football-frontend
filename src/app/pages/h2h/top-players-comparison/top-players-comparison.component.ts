import { Component, Input, OnInit } from '@angular/core';
import { H2hService } from '../../../shared/services/h2h.service';
import {
  LeagueAndSeasons,
  SeasonsOfLeague,
  TopScorer,
} from '../../../shared/interfaces/team-profile.interface';
import { forkJoin } from 'rxjs';
import { TeamComparisionInterface } from '../../../shared/interfaces/league.interface';
import { LeagueAndSeasonsService } from '../../../shared/services/leagueAndSeasons.service';
import { TeamService } from '../../../shared/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-players-comparison',
  templateUrl: './top-players-comparison.component.html',
  styleUrls: ['./top-players-comparison.component.scss'],
})
export class TopPlayersComparisonComponent implements OnInit {
  list: {
    performance: string;
    home: any;
    away: any;
  }[] = [];
  public seasons: SeasonsOfLeague[] = [];
  public leagues: LeagueAndSeasons[] = [];
  public firstTeamData?: TeamComparisionInterface[];
  public secondTeamData?: TeamComparisionInterface[];
  curLeague: number | undefined;
  curSeason: number | undefined | string;
  public secondTeam?: TopScorer;
  public firstTeam?: TopScorer;

  constructor(
    private readonly _h2hService: H2hService,
    private readonly _leagueAndSeasonsService: LeagueAndSeasonsService,
    private readonly _teamService: TeamService,
    private router: Router
  ) {}
  @Input() firstTeamId: number | undefined;
  @Input() secondTeamId: number | undefined;

  selectSeason(id: number) {
    this.curSeason = id;
    this.teamPlayersComparision();
  }

  ngOnInit(): void {
    forkJoin([
      this._leagueAndSeasonsService.getLeagueAndSeasons(this.firstTeamId),
      this._leagueAndSeasonsService.getLeagueAndSeasons(this.secondTeamId),
      this._teamService.getSecondaryInfo(this.firstTeamId),
      this._teamService.getSecondaryInfo(this.secondTeamId),
    ]).subscribe((res) => {
      const arr = res[0].concat(res[1]);
      const leagueSeasons = arr.reduce(
        (acc: any[], current: { leagueId: any }) => {
          const x = acc.find((item) => item.leagueId === current.leagueId);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        },
        []
      );
      this._teamService.leagueSeasons.next(leagueSeasons);
      this.curLeague = leagueSeasons[0]?.leagueId;
      this.firstTeam = res[2];
      this.secondTeam = res[3];
      this.getLeagues();
    });
  }

  private getLeagues() {
    this._teamService.leagueSeasons.pipe().subscribe((res) => {
      this.leagues = res;
      this.getSeasons();
    });
  }

  selectLeague(id: number) {
    this.curSeason = undefined;
    this.curLeague = id;
    this.getSeasons();
  }

  protected getSeasons() {
    const l: LeagueAndSeasons | undefined = this.leagues?.find(
      (l) => l.leagueId === this.curLeague
    );
    if (!this.curSeason) {
      this.curSeason = l?.seasons[0].seasonId;
    }
    this.seasons = l?.seasons || [];
    this.teamPlayersComparision();
  }

  teamPlayersComparision() {
    forkJoin([
      this._h2hService.teamData(this.firstTeamId, this.curSeason),
      this._h2hService.teamData(this.secondTeamId, this.curSeason),
    ]).subscribe((res) => {
      this.firstTeamData = res[0];
      this.secondTeamData = res[1];

      const maxScore_f = Math.max(
        ...this.firstTeamData.map((obj) => obj.goals)
      );
      const topScorerFirst = this.firstTeamData.find(
        (d) => d.goals === maxScore_f
      );
      const maxScore_s = Math.max(
        ...this.secondTeamData.map((obj) => obj.goals)
      );
      const topScorerSecond = this.secondTeamData.find(
        (d) => d.goals === maxScore_s
      );

      const maxAssist_f = Math.max(
        ...this.firstTeamData.map((obj) => obj.assists)
      );
      const maxAssist_s = Math.max(
        ...this.secondTeamData.map((obj) => obj.assists)
      );
      const assistsFirst = this.firstTeamData.find(
        (d) => d.assists === maxAssist_f
      );
      const assistsSecond = this.secondTeamData.find(
        (d) => d.assists === maxAssist_s
      );

      const appearences_f = Math.max(
        ...this.firstTeamData.map((obj) => obj.appearences)
      );
      const appearences_s = Math.max(
        ...this.secondTeamData.map((obj) => obj.appearences)
      );
      const appearencesFirst = this.firstTeamData.find(
        (d) => d.appearences === appearences_f
      );
      const appearencesSecond = this.secondTeamData.find(
        (d) => d.appearences === appearences_s
      );

      const mins_f = Math.max(...this.firstTeamData.map((obj) => obj.minutes));
      const mins_s = Math.max(...this.secondTeamData.map((obj) => obj.minutes));
      const minFirst = this.firstTeamData.find((d) => d.minutes === mins_f);
      const minSecond = this.secondTeamData.find((d) => d.minutes === mins_s);

      const cards_f = Math.max(
        ...this.firstTeamData.map((obj) => obj.yellowcards)
      );
      const cards_s = Math.max(
        ...this.secondTeamData.map((obj) => obj.yellowcards)
      );
      const cardsFirst = this.firstTeamData.find(
        (d) => d.yellowcards === cards_f
      );
      const cardsSecond = this.secondTeamData.find(
        (d) => d.yellowcards === cards_s
      );
      this.list = [
        {
          performance: 'Top Scorer',
          home: topScorerFirst
            ? `${topScorerFirst?.player.data.display_name} (${topScorerFirst?.goals})`
            : '',
          away: topScorerSecond
            ? `${topScorerSecond?.player.data.display_name} (${topScorerSecond?.goals})`
            : '',
        },
        {
          performance: 'Top Assists',
          home: assistsFirst
            ? `${assistsFirst?.player.data.display_name} (${assistsFirst?.assists})`
            : '',
          away: assistsSecond
            ? `${assistsSecond?.player.data.display_name} (${assistsSecond?.assists})`
            : '',
        },
        {
          performance: 'Most Appearances',
          home: appearencesFirst
            ? `${appearencesFirst?.player.data.display_name} (${appearencesFirst?.appearences})`
            : '',
          away: appearencesSecond
            ? `${appearencesSecond?.player.data.display_name} (${appearencesSecond?.appearences})`
            : '',
        },
        {
          performance: 'Most Mins Played',
          home: minFirst
            ? `${minFirst?.player.data.display_name} (${minFirst?.minutes})`
            : '',
          away: minSecond
            ? `${minSecond?.player.data.display_name} (${minSecond?.minutes})`
            : '',
        },
        {
          performance: 'Most Cards',
          home: cardsFirst
            ? `${cardsFirst?.player.data.display_name} (${cardsFirst?.yellowcards})`
            : '',
          away: cardsSecond
            ? `${cardsSecond?.player.data.display_name} (${cardsSecond?.yellowcards})`
            : '',
        },
      ];
    });
  }

  navigateToPlayerProfile(playerName: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['player', playerName]));
  }
}
