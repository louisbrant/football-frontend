import { Component, Input, OnInit } from '@angular/core';
import { FilterDirective } from '../../../shared/directive/filter.directive';
import { TeamService } from '../../../shared/services/team.service';
import {
  GoalByMinutes,
  GoalProbabilities,
  MatchStatistics,
  Performance,
} from '../../../shared/interfaces/stats.interface';
import { forkJoin } from 'rxjs';
import { H2hTeams } from '../../../shared/interfaces/h2hInteresting.interface';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import { isEmptyObject } from '../../../shared/helper/isEmptyObject';

enum defaultSeason {
  All = 'All'
}

@Component({
  selector: 'app-season-stats',
  templateUrl: './season-stats.component.html',
  styleUrls: ['./season-stats.component.scss'],
})
export class SeasonStatsComponent extends FilterDirective implements OnInit {
  @Input() firstTeamId!: number;
  @Input() secondTeamId!: number;
  @Input() allMatches!: H2hTeams[] | undefined;
  @Input() allSelected?: boolean;
  @Input() seasonIds!: number[];
  @Input() firstTeamName!: string;
  @Input() secondTeamName!: string;
  firstTeamPerformance! : Performance;
  secondTeamPerformance!: Performance;
  firstTeamGoalsScored!: GoalByMinutes;
  secondTeamGoalsScored!: GoalByMinutes;
  firstTeamMatchStat!: MatchStatistics;
  secondTeamMatchStat!: MatchStatistics;
  firstTeamProbabilities!: GoalProbabilities;
  secondTeamProbabilities!: GoalProbabilities;
  matches: any;
  matchStates: H2hTeams[] | undefined;

  constructor(protected override teamService: TeamService) {
    super(teamService);
  }

  ngOnChanges(): void {
    this.matches = this.allMatches?.map((m) => {
      return {
        id: m.id,
      };
    });
  }

  changeMatch(value: string) {}

  protected override getData() {
    let seasonIdsOfLeague: number[] = [];
    this.subject$
      .asObservable()
      .pipe(
          tap(() => {
              seasonIdsOfLeague = this.seasons.map(s => s.seasonId);
          }),
        switchMap(() =>
          forkJoin([
            this.teamService.getPerformance(
              this.firstTeamId,
              this.curLeague,
                (typeof this.curSeason === "number" && typeof this.curLeague === "number") ? this.curSeason : (typeof this.curLeague === "number" && this.curSeason === defaultSeason.All) ? seasonIdsOfLeague : this.seasonIds
            ),
            this.teamService.getPerformance(
              this.secondTeamId,
              this.curLeague,
                (typeof this.curSeason === "number" && typeof this.curLeague === "number") ? this.curSeason : (typeof this.curLeague === "number" && this.curSeason === defaultSeason.All) ? seasonIdsOfLeague : this.seasonIds
            ),
            this.teamService.getGoalByMinutes(
              this.firstTeamId,
              this.curLeague,
                (typeof this.curSeason === "number" && typeof this.curLeague === "number") ? this.curSeason : (typeof this.curLeague === "number" && this.curSeason === defaultSeason.All) ? seasonIdsOfLeague : this.seasonIds
            ),
            this.teamService.getGoalByMinutes(
              this.secondTeamId,
              this.curLeague,
                (typeof this.curSeason === "number" && typeof this.curLeague === "number") ? this.curSeason : (typeof this.curLeague === "number" && this.curSeason === defaultSeason.All) ? seasonIdsOfLeague : this.seasonIds
            ),
            this.teamService.getMatchStatistics(
              this.firstTeamId,
              this.curLeague,
                (typeof this.curSeason === "number" && typeof this.curLeague === "number") ? this.curSeason : (typeof this.curLeague === "number" && this.curSeason === defaultSeason.All) ? seasonIdsOfLeague : this.seasonIds
            ),
            this.teamService.getMatchStatistics(
              this.secondTeamId,
              this.curLeague,
                (typeof this.curSeason === "number" && typeof this.curLeague === "number") ? this.curSeason : (typeof this.curLeague === "number" && this.curSeason === defaultSeason.All) ? seasonIdsOfLeague : this.seasonIds
            ),
            this.teamService.goalsProbabilities(
              this.firstTeamId,
              this.curLeague,
                (typeof this.curSeason === "number" && typeof this.curLeague === "number") ? this.curSeason : (typeof this.curLeague === "number" && this.curSeason === defaultSeason.All) ? seasonIdsOfLeague : this.seasonIds
            ),
            this.teamService.goalsProbabilities(
              this.secondTeamId,
              this.curLeague,
                (typeof this.curSeason === "number" && typeof this.curLeague === "number") ? this.curSeason : (typeof this.curLeague === "number" && this.curSeason === defaultSeason.All) ? seasonIdsOfLeague : this.seasonIds
            ),
          ])
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res) => {
        this.firstTeamPerformance = isEmptyObject(res) ? undefined : res[0];
        this.secondTeamPerformance = isEmptyObject(res) ? undefined : res[1];
        this.firstTeamGoalsScored = isEmptyObject(res) ? undefined : res[2];
        this.secondTeamGoalsScored = isEmptyObject(res) ? undefined : res[3];
        this.firstTeamMatchStat = res[4];
        this.secondTeamMatchStat = res[5];
        this.firstTeamProbabilities = isEmptyObject(res) ? undefined : res[6];
        this.secondTeamProbabilities = isEmptyObject(res) ? undefined : res[7];
      });
  }
}
