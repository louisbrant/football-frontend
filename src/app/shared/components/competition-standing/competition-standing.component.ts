import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CompetitionStanding } from '../../interfaces/standings.interface';
import { setPositionColor } from '../../helper/result-position';
import { FilterDirective } from '../../directive/filter.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition-standing',
  templateUrl: './competition-standing.component.html',
  styleUrls: ['./competition-standing.component.scss'],
})
export class CompetitionStandingComponent
  extends FilterDirective
  implements OnInit {
  competitionStandings: CompetitionStanding[] = [];

  constructor(
    protected override teamService: TeamService,
    private router: Router
  ) {
    super(teamService);
  }

  override selectSeason(id: number) {
    this.competitionStandings = [];
    super.selectSeason(id);
  }

  override selectLeague(id: number) {
    this.competitionStandings = [];
    super.selectLeague(id);
  }

  protected override getData() {
    this.subject$
      .asObservable()
      .pipe(
        switchMap(() =>
          this.teamService.getCompetitionStandings(
            this.count,
            this.offset,
            this.curSeason,
            this.curLeague
          )
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res) => {
        this.lastLength = this.competitionStandings.length;
        this.competitionStandings = this.competitionStandings.concat(
          res.map((item: CompetitionStanding) => {
            // console.log(item)
            return {
              ...item,
              class: setPositionColor(item.name),
            };
          })
        );
        this.loaderState = {
          val: false,
        };
      });
  }

  navigateToTeamPage(teamName: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['team', teamName]));
  }
}
