import {Directive, Input, OnInit} from '@angular/core';
import {UnsubscribeDirective} from "./unsubscribe.directive";
import {LoaderState, SeasonsOfLeague} from "../interfaces/team-profile.interface";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {LeagueService} from "../services/league.service";


@Directive({
  selector: '[appFilterLeague]'
})
export class FilterLeagueDirective extends UnsubscribeDirective implements OnInit {
  @Input() title = '';
  label = '';
  seasons: SeasonsOfLeague[] = [];
  curSeason: number | undefined | string;
  loaderState: LoaderState = {
    val: false
  };
  lastLength = 0;
  subject$: Subject<void> = new Subject<void>();
  protected count: number = 10;
  protected offset: number = 1;
  protected page: number = 1;

  constructor(
    protected leagueService: LeagueService
  ) {
    super()
  }

  ngOnInit(): void {
    this.curSeason = this.leagueService.league?.currentSeasonId;
    this.getSeasons();
    this.getData();
    this.callSubject();
  }

  protected getData() {
  }

  selectSeason(id: number) {
    this.curSeason = id;
    this.setSeasonName();
    this.offset = 1;
    this.page = 1;
    this.callSubject();
  }

  more() {
    this.offset += this.count;
    this.page += 1;
    this.callSubject();
  }

  protected getSeasons() {
    this.leagueService.seasons.pipe(
      takeUntil(this.subscription)
    ).subscribe(res => {
      this.seasons = res;
      this.setSeasonName()
    });
  }

  protected callSubject() {
    this.subject$.next();
  }

  private setSeasonName() {
    const cSeason = this.seasons.find(s => s.seasonId === this.curSeason);
    this.label = this.title + ' Table ' + cSeason?.seasonName;
  }
}
