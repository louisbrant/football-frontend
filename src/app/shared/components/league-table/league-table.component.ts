import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../services/league.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { GeneralStats } from '../../interfaces/stats.interface';
import { setPositionColor } from '../../helper/result-position';
import { FilterLeagueDirective } from '../../directive/filterLeague.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss'],
})
export class LeagueTableComponent extends FilterLeagueDirective {
  table: GeneralStats[] = [];

  constructor(
    protected override leagueService: LeagueService,
    private router: Router
  ) {
    super(leagueService);
  }

  protected override getData() {
    this.subject$
      .asObservable()
      .pipe(
        switchMap(() =>
          this.leagueService.getGeneralStats(
            this.leagueService.league.id,
            this.curSeason
          )
        ),
        takeUntil(this.subscription)
      )
      .subscribe(
        (res) =>
        (this.table = res.map((item: GeneralStats) => {
          return {
            ...item,
            class: setPositionColor(item.name),
          };
        })),
        () => (this.loaderState = { val: false })
      );
  }

  navigateToTeamPage(teamName: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['team', teamName]));
  }
}
