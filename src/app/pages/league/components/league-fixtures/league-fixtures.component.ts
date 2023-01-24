import {Component} from '@angular/core';
import {Observable, switchMap, takeUntil} from "rxjs";
import {Fixture, FixtureData, ResultEnum} from "../../../../shared/interfaces/fixtures.interface";
import {LeagueService} from "../../../../shared/services/league.service";
import {FilterLeagueDirective} from "../../../../shared/directive/filterLeague.directive";

@Component({
  selector: 'app-league-fixtures',
  templateUrl: './league-fixtures.component.html',
  styleUrls: ['./league-fixtures.component.scss']
})
export class LeagueFixturesComponent extends FilterLeagueDirective {
  fixtures: Fixture[] = [];

  constructor(
    protected override leagueService: LeagueService
  ) {
    super(leagueService)
  }

  protected override getData() {
  this.subject$.asObservable()
      .pipe(
        switchMap(() => this.leagueService.getFixtures(
          this.count,
          this.page,
          this.leagueService.league.id,
          this.curSeason,
          ResultEnum.FIXTURE)
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res: FixtureData) => {
        this.page = res?.page;
        if (this.page === 1) {
          this.fixtures = [];
        }
        this.lastLength = this.fixtures.length;
        this.fixtures = this.fixtures.concat(res.data);
        this.fixtures = this.fixtures.concat(res.data).sort((a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime());
        this.loaderState = {val: false};
      }, () => this.loaderState = {val: false})
  }
}
