import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../../shared/services/team.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {Performance} from "../../../../shared/interfaces/stats.interface";
import {FilterDirective} from "../../../../shared/directive/filter.directive";
import {isEmptyObject} from "../../../../shared/helper/isEmptyObject";

@Component({
  selector: 'app-performance-summary',
  templateUrl: './performance-summary.component.html',
  styleUrls: ['./performance-summary.component.scss']
})
export class PerformanceSummaryComponent extends FilterDirective implements OnInit {
  performance: Performance | undefined;
  constructor(
    protected override teamService: TeamService
  ) {
    super(teamService)
  }

  protected override getData() {
    this.subject$.asObservable()
      .pipe(
        switchMap(() => this.teamService.getPerformance(
          this.teamService.team.id,
          this.curLeague,
          this.curSeason)
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res: Performance) => this.performance = isEmptyObject(res) ? undefined : res)
  }

}
