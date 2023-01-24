import { Component, OnInit } from '@angular/core';
import {switchMap, takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../../shared/services/team.service";
import {PlayerService} from "../../shared/services/player.service";
import {GeneralInfo} from "../../shared/interfaces/player.interface";
import {Observable, of} from "rxjs";
import {UnsubscribeDirective} from "../../shared/directive/unsubscribe.directive";
import {LeagueAndSeasonsService} from "../../shared/services/leagueAndSeasons.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent extends UnsubscribeDirective implements OnInit {
  player!: GeneralInfo | null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private playerService: PlayerService,
    private leagueAndSeasonsService: LeagueAndSeasonsService
  ) {
    super()
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({playerName}) => {
          playerName = playerName.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          this.loading = true;
          return this.playerService.generalInfo(playerName)
        }),
        switchMap(res => {
          this.loading = false;
          this.player = res;
          this.playerService.player = res;
          this.teamService.team = {
            id: res.team.id,
            name: res.team.name,
            leagueId: res.leagueId,
            seasonId: res.seasonId
          };
          return this.leagueAndSeasonsService.getLeagueAndSeasons(this.player.team.id)
        }),
        takeUntil(this.subscription)
      )
      .subscribe(res => {
        this.teamService.leagueSeasons.next(res);
      }, () => this.loading = false);
  }
}
