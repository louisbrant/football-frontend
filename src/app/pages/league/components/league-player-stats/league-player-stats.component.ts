import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {LeagueService} from "../../../../shared/services/league.service";
import {SeasonsOfLeague} from "../../../../shared/interfaces/team-profile.interface";
import {PlayerStats} from "../../../../shared/interfaces/stats.interface";

@Component({
  selector: 'app-league-player-stats',
  templateUrl: './league-player-stats.component.html',
  styleUrls: ['./league-player-stats.component.scss']
})
export class LeaguePlayerStatsComponent implements OnInit {

  @Input() title!: string | undefined;
  @Input() seasonId!: number | undefined;
  seasons: SeasonsOfLeague[] | undefined | null = [];
  playerStats!: PlayerStats;
  page = 0;
  count = 10;
  constructor(
    private readonly leagueService: LeagueService
  ) {
  }

  ngOnInit(): void {
    this.getPlayersStat(this.seasonId);
  }

  private getPlayersStat(seasonId: number | undefined) {
    // this.leagueService.getPlayersStat(
    //   this.teamId,
    //   seasonId
    // )
    //   .pipe(
    //     takeUntil(this.subscription)
    //   )
    //   .subscribe(res => {
    //     this.playerStats = res;
    //     this.allPlayers = res.players;
    //     this.more();
    //   })
  }

  more() {
    // this.loaderState = {
    //   val: false
    // };
    // this.page += 1;
    // this.playerStats.players = this.allPlayers.filter((_, i) => this.page * this.count > i);

  }
}
