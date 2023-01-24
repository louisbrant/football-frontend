import {Component, Input} from '@angular/core';
import {Fixture, ResultEnum} from "../../interfaces/fixtures.interface";
import {TeamService} from "../../services/team.service";
import {LeagueAndSeasons} from "../../interfaces/team-profile.interface";
import {switchMap, takeUntil} from "rxjs/operators";
import {FilterDirective} from "../../directive/filter.directive";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent extends FilterDirective {
  @Input() title!: string | undefined;
  results: Fixture[] = [];

  constructor(
      protected override teamService: TeamService
  ) {
    super(teamService);
  }

  protected override getData() {
    this.curSeason = new Date().getFullYear();
    this.subject$.asObservable()
      .pipe(
        switchMap(() => this.teamService.getFixtures(
          ResultEnum.RESULT,
          this.teamService.team.id,
          this.curLeague,
          this.curSeason,
          this.page)
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res: Fixture[]) => {
        if (this.page === 1) {
          this.results = [];
        }
        this.lastLength = this.results.length;
        this.results = this.results.concat(res.map(r => {
          let className = '';
          if (r.homeTeam.score !== undefined && r.awayTeam.score !== undefined) {
            if ((r.awayTeam.name.toLowerCase() === this.title?.toLowerCase() && r.awayTeam.score > r.homeTeam.score) ||
                (r.homeTeam.name.toLowerCase() === this.title?.toLowerCase() && r.homeTeam.score > r.awayTeam.score)) {
              className = 'result-win'
            } else if ((r.awayTeam.name.toLowerCase() === this.title?.toLowerCase() && r.awayTeam.score < r.homeTeam.score) ||
                (r.homeTeam.name.toLowerCase() === this.title?.toLowerCase() && r.homeTeam.score < r.awayTeam.score)) {
              className = 'result-lost'
            } else {
              className = 'result-draw'
            }
          }
          return {...r, class: className}
        }));
        this.loaderState = {val: false};
      }, () => this.loaderState = {val: false})
  }

  protected override getSeasons() {
    const l: LeagueAndSeasons | undefined = this.leagues?.find(l => l.leagueId === this.curLeague);
    this.seasons = [];
    if (l?.seasons?.length) {
      l.seasons.forEach(s => {
        const years = s.seasonName.split('/');
        years.forEach(y => {
          if (!this.seasons.some(season => season.seasonName === y)) {
            this.seasons.push({seasonId: +y, seasonName: y})
          }
        })
      })
    }
    if (this.seasons?.length) {
      const currentYear = this.seasons.find(s => s.seasonId === new Date().getFullYear());
      this.curSeason = currentYear ? currentYear.seasonId : this.seasons[0].seasonId;
    }
  }

}
