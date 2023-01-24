import { Directive, Input, OnInit } from '@angular/core';
import { UnsubscribeDirective } from './unsubscribe.directive';
import {
  LeagueAndSeasons,
  LoaderState,
  SeasonsOfLeague,
} from '../interfaces/team-profile.interface';
import { Subject } from 'rxjs';
import { TeamService } from '../services/team.service';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appFilter]',
})
export class FilterDirective extends UnsubscribeDirective implements OnInit {
  @Input() seasonId!: number | undefined;
  @Input() leagueId!: number | undefined;
  seasons: SeasonsOfLeague[] = [];
  leagues: LeagueAndSeasons[] = [];
  curLeague: number | undefined;
  curSeason: number | undefined | string;
  loaderState: LoaderState = {
    val: false,
  };
  lastLength = 0;
  subject$: Subject<void> = new Subject<void>();
  protected count: number = 10;
  protected offset: number = 1;
  protected page: number = 1;

  constructor(protected teamService: TeamService) {
    super();
  }

  ngOnInit(): void {
    this.curLeague = this.leagueId ?? this.teamService.team?.leagueId;
    this.curSeason = this.seasonId ?? this.teamService.team?.seasonId;
    this.getLeagues();
    this.getData();
    this.callSubject();
  }

  protected getData() {}

  protected getSeasons() {
    const l: LeagueAndSeasons | undefined = this.leagues?.find(
      (l) => l.leagueId === this.curLeague
    );
    if (!this.curSeason) {
      this.curSeason = l?.seasons[0].seasonId;
    }
    this.seasons = l?.seasons || [];
  }

  selectSeason(id: number) {
    this.curSeason = id;
    this.offset = 1;
    this.page = 1;
    this.callSubject();
  }

  selectLeague(id: number) {
    this.curSeason = undefined;
    this.curLeague = id;
    this.offset = 1;
    this.page = 1;
    this.getSeasons();
    this.callSubject();
  }

  more() {
    this.offset += this.count;
    this.page += 1;
    this.callSubject();
  }

  private getLeagues() {
    this.teamService.leagueSeasons
      .pipe(takeUntil(this.subscription))
      .subscribe((res) => {
        this.leagues = res;
        this.getSeasons();
      });
  }

  protected callSubject() {
    this.subject$.next();
  }
}
