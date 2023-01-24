import { Component, Input, OnInit } from '@angular/core';
import { Fixture, ResultEnum } from "../../interfaces/fixtures.interface";
import { Observable, switchMap, takeUntil } from "rxjs";
import { TeamService } from "../../services/team.service";
import { LeagueAndSeasons } from "../../interfaces/team-profile.interface";
import { FilterDirective } from "../../directive/filter.directive";

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent extends FilterDirective implements OnInit {
  @Input() title!: string | undefined;

  fixtures: Fixture[] = [];

  constructor(
    protected override teamService: TeamService,
  ) {
    super(teamService)
  }

  protected override getData() {
    this.curSeason = new Date().getFullYear();
    this.subject$.asObservable()
      .pipe(
        switchMap(() => this.teamService.getFixtures(
          ResultEnum.FIXTURE,
          this.teamService.team.id,
          this.curLeague,
          this.curSeason,
          this.page)
        ),
        takeUntil(this.subscription)
      )
      .subscribe((res: Fixture[]) => {
        if (this.page === 1) {
          this.fixtures = [];
        }
        this.lastLength = this.fixtures.length;
        this.fixtures = this.fixtures.concat(res).sort((a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime());
        this.loaderState = { val: false };
      }, () => this.loaderState = { val: false })
  }

  protected override getSeasons() {
    const l: LeagueAndSeasons | undefined = this.leagues?.find(l => l.leagueId === this.curLeague);
    this.seasons = [];
    if (l?.seasons?.length) {
      l.seasons.forEach(s => {
        const years = s.seasonName.split('/');
        years.forEach(y => {
          if (!this.seasons.some(season => season.seasonName === y)) {
            this.seasons.push({ seasonId: +y, seasonName: y })
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
