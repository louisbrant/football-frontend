import {Component, Input, OnInit} from '@angular/core';
import {UnsubscribeDirective} from "../../directive/unsubscribe.directive";
import {TeamService} from "../../services/team.service";
import {map, takeUntil} from "rxjs/operators";
import {PlayerStats} from "../../interfaces/stats.interface";
import {Player} from "../../interfaces/player.interface";
import {LoaderState, SeasonsOfLeague} from "../../interfaces/team-profile.interface";
import {Router} from "@angular/router";
import {LeagueService} from "../../services/league.service";
import {H2hService} from "../../services/h2h.service";

@Component({
  selector: 'app-team-player-stats',
  templateUrl: './team-player-stats.component.html',
  styleUrls: ['./team-player-stats.component.scss']
})
export class TeamPlayerStatsComponent extends UnsubscribeDirective implements OnInit {

  @Input() title!: string | undefined;
  @Input() coachShow: boolean = true;
  @Input() seasonId!: number | undefined;
  @Input() teamId!: number | undefined;
  seasons: SeasonsOfLeague[] = [];
  playerStats!: PlayerStats;
  allPlayers: Player[] = [];
  loaderState: LoaderState = {
    val: false
  };
  page = 0;
  count = 10;
  constructor(
    private readonly teamService: TeamService,
    private readonly router: Router,
    private readonly leagueService: LeagueService,
    private readonly h2hService: H2hService
  ) {
    super()
  }

  ngOnInit(): void {
    if (this.router.url.includes('league')) {
      this.leagueService.getLeagueSeasons(this.leagueService.league.id).subscribe(res => {
        this.seasons = res;
      })
    } else {
      this.teamService.leagueSeasons.pipe(
        map(league =>
          league.find(l => l.leagueId === (this.teamService.team?.leagueId || this.h2hService?.league?.id))?.seasons),
        takeUntil(this.subscription)
      ).subscribe(res => this.seasons = res || []);
    }
    this.getPlayersStat(this.seasonId);
  }

  private getPlayersStat(seasonId: number | undefined) {
    let playersData: Player[] = [];
    if (this.router.url.includes('league')) {
      this.teamService.getLeaguePlayerState(
        seasonId
      ).pipe(
          takeUntil(this.subscription)
        ).subscribe(resp => {
        resp?.forEach((item: any) => {
          item?.forEach((i: any) => {
            playersData.push({
              id: i?.player_id,
              number: i?.number,
              fullName: i?.player?.data?.fullname,
              image_path: i?.player?.data?.image_path,
              position: i?.position?.data?.name,
              gamesPlayed: i?.appearences,
              goals: i?.goals,
              assists: i?.assists,
              cards: (i?.yellowcards || 0) + (i?.redcards || 0),
              timePlayed: i?.minutes,
              rating: i?.rating,
              team_logo: i?.player?.data?.team?.data?.logo_path
            })
          })
        })
        this.playerStats = resp;
        this.allPlayers = playersData;
        this.more();
      }, error => {
        console.error(error)
      })
    } else {
      this.teamService.getPlayersStat(
        this.teamId,
        seasonId
      )
        .pipe(
          takeUntil(this.subscription)
        )
        .subscribe(res => {
          this.playerStats = res;
          this.allPlayers = res.players;
          this.more();
        })
    }
  }

  more() {
    this.loaderState = {
      val: false
    };
    this.page += 1;
    this.playerStats.players = this.allPlayers.filter((_, i) => this.page * this.count > i);

  }

  selectSeason(id: number) {
    this.page = 0;
    this.getPlayersStat(id);
  }
}
