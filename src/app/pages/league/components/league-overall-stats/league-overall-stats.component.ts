import { Component } from '@angular/core';
import { LeagueService } from '../../../../shared/services/league.service';
import { OverallStatsLeague } from '../../../../shared/interfaces/overall-stats.interface';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FilterLeagueDirective } from '../../../../shared/directive/filterLeague.directive';
import { isEmptyObject } from '../../../../shared/helper/isEmptyObject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league-overall-stats',
  templateUrl: './league-overall-stats.component.html',
  styleUrls: ['./league-overall-stats.component.scss'],
})
export class LeagueOverallStatsComponent extends FilterLeagueDirective {
  overallStats!: OverallStatsLeague;
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
          this.leagueService.getOverallStats(
            this.leagueService.league.id,
            this.curSeason
          )
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res) => {
        (this.overallStats = isEmptyObject(res) ? undefined : res),
          () => (this.loaderState = { val: false });
      });
  }

  navigateToTeamPage(teamName: any) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['team', teamName]));
  }

  navigateToPlayerProfile(playerName: any) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['player', playerName]));
  }
}
