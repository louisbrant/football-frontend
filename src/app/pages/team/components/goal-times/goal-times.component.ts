import { Component } from '@angular/core';
import {TeamService} from "../../../../shared/services/team.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {GoalByMinutes} from "../../../../shared/interfaces/stats.interface";
import {Subject} from "rxjs";
import {FilterDirective} from "../../../../shared/directive/filter.directive";
import {isEmptyObject} from "../../../../shared/helper/isEmptyObject";

@Component({
  selector: 'app-goal-times',
  templateUrl: './goal-times.component.html',
  styleUrls: ['./goal-times.component.scss']
})
export class GoalTimesComponent extends FilterDirective {
  list: GoalByMinutes | undefined;

  constructor(
    protected override teamService: TeamService
  ) {
    super(teamService)
  }

  protected override getData() {
    this.subject$.asObservable()
      .pipe(
        switchMap(() => this.teamService.getGoalByMinutes(
          this.teamService.team.id,
          this.curLeague,
          this.curSeason)
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res: GoalByMinutes) => this.list = isEmptyObject(res) ? undefined : res)
  }

}
