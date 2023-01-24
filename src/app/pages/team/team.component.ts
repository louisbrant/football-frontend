import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap, takeUntil} from "rxjs/operators";
import {TeamService} from "../../shared/services/team.service";
import {SearchTeam} from "../../shared/interfaces/team-profile.interface";
import {UnsubscribeDirective} from "../../shared/directive/unsubscribe.directive";
import {LeagueAndSeasonsService} from "../../shared/services/leagueAndSeasons.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent extends UnsubscribeDirective implements OnInit {
  team!: SearchTeam | null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private leagueAndSeasonsService: LeagueAndSeasonsService
  ) {
    super()
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({teamName}) => {
          this.loading = true;
          return this.teamService.search(teamName)
        }),
        switchMap(res => {
          this.loading = false;
          this.team = res;
          this.teamService.team = res;
          return this.leagueAndSeasonsService.getLeagueAndSeasons(this.team?.id)
        }),
        takeUntil(this.subscription)
      )
      .subscribe((res: any) => {
        this.teamService.leagueSeasons.next(res);
      }, () => this.loading = false);
  }
}
