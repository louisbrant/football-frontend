import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../../shared/services/team.service";
import {switchMap, takeUntil} from "rxjs/operators";
import {GoalProbabilities} from "../../../../shared/interfaces/stats.interface";
import {Observable} from "rxjs";
import {FilterDirective} from "../../../../shared/directive/filter.directive";
import {isEmptyObject} from "../../../../shared/helper/isEmptyObject";

@Component({
  selector: 'app-total-match-goals',
  templateUrl: './total-match-goals.component.html',
  styleUrls: ['./total-match-goals.component.scss']
})
export class TotalMatchGoalsComponent extends FilterDirective implements OnInit {
  probabilities: GoalProbabilities | undefined;

  constructor(
    protected override teamService: TeamService
  ) {
    super(teamService)
  }

  protected override getData() {
    this.subject$.asObservable()
      .pipe(
        switchMap(() => this.teamService.goalsProbabilities(
          this.teamService.team.id,
          this.curLeague,
          this.curSeason)
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res: GoalProbabilities) => this.probabilities = isEmptyObject(res) ? undefined : res)
  }
}
