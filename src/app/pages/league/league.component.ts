import {Component, OnInit} from '@angular/core';
import {LeagueService} from "../../shared/services/league.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {UnsubscribeDirective} from "../../shared/directive/unsubscribe.directive";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {SeachLeague} from "../../shared/interfaces/league.interface";
import {SeasonsOfLeague} from "../../shared/interfaces/team-profile.interface";

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent extends UnsubscribeDirective implements OnInit {
  league!: SeachLeague | null;
  loading: boolean = false;
  seasons: SeasonsOfLeague[] = [];

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService
  ) {
    super()
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({leagueName}) => {
          this.loading = true;
          return this.leagueService.search(leagueName)
        }),
        switchMap(res => {
          this.loading = false;
          this.league = res;
          this.leagueService.league = res;
          return this.leagueService.seasonsOfLeague(this.league.id);
        }),
        takeUntil(this.subscription)
      )
      .subscribe(res => {
        this.seasons = res;
        this.leagueService.seasons.next(res);
      }, () => this.loading = false);
  }
}
