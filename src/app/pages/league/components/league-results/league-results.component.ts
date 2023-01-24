import {Component} from '@angular/core';
import {Observable, switchMap, takeUntil} from "rxjs";
import {Fixture, FixtureData, ResultEnum} from "../../../../shared/interfaces/fixtures.interface";
import {LeagueService} from "../../../../shared/services/league.service";
import {FilterLeagueDirective} from "../../../../shared/directive/filterLeague.directive";

@Component({
  selector: 'app-league-results',
  templateUrl: './league-results.component.html',
  styleUrls: ['./league-results.component.scss']
})
export class LeagueResultsComponent extends FilterLeagueDirective {
  results: Fixture[] = [];

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
          ResultEnum.RESULT)
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res: FixtureData) => {
        const fixtures = res.data.filter(fixture => new Date(`${fixture.dateStart} UTC`) < new Date);
        if (this.page === 1) {
          this.results = [];
        }
        this.page = res?.page;
        this.lastLength = this.results.length;
        this.results = this.results.concat(fixtures).sort((a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime());
        this.loaderState = {val: false};
      }, () => this.loaderState = {val: false})
  }
}
