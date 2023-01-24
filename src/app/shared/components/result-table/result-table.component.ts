import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Fixture} from '../../interfaces/fixtures.interface';
import {
  LeagueAndSeasons,
  LoaderState,
  SeasonsOfLeague,
} from '../../interfaces/team-profile.interface';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
  @Input() title!: string | undefined;
  @Input() hasLeague = true;
  @Input() hasSeason = true;
  @Input() results: Fixture[] = [];
  @Input() seasons: SeasonsOfLeague[] = [];
  @Input() seasonId: number | undefined | string;
  @Input() leagues: LeagueAndSeasons[] = [];
  @Input() leagueId: number | undefined;
  @Input() lastLength: number = 0;
  @Input() loaderState: LoaderState = {
    val: false,
  };

  @Output() getMore = new EventEmitter();
  @Output() selectedSeason = new EventEmitter<number>();
  @Output() selectedLeague = new EventEmitter<number>();

  constructor(private router: Router) {
  }

  navigateToH2h(firstTeamId: number, secondTeamId: number) {
    this.router
      .navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['h2h', firstTeamId, secondTeamId]));
  }

  navigateToEvent(fixtureId: number) {
    this.router.navigate(['live', fixtureId]);
  }

  navigateToTeamPage(teamName: string) {
    this.router
      .navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['team', teamName]));
  }
}
