import { Component } from '@angular/core';
import {TeamService} from "../../../../shared/services/team.service";
import {MatchStatistics} from "../../../../shared/interfaces/stats.interface";
import {switchMap, takeUntil} from "rxjs/operators";
import {FilterDirective} from "../../../../shared/directive/filter.directive";
import {isEmptyObject} from "../../../../shared/helper/isEmptyObject";

@Component({
  selector: 'app-season-match-stats',
  templateUrl: './season-match-stats.component.html',
  styleUrls: ['./season-match-stats.component.scss']
})
export class SeasonMatchStatsComponent extends FilterDirective {
  matchStatistics: MatchStatistics | undefined;

  constructor(
    protected override teamService: TeamService
  ) {
    super(teamService)
  }

  protected override getData() {
    this.subject$.asObservable()
      .pipe(
        switchMap(() => this.teamService.getMatchStatistics(
          this.teamService.team.id,
          this.curLeague,
          this.curSeason
        )),
        takeUntil(this.subscription)
      )
      .subscribe((res: MatchStatistics) => this.matchStatistics = isEmptyObject(res) ? undefined : res)
  }
}
