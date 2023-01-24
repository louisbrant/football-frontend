import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatchInterface } from '../../../shared/interfaces/match.interface';
import { H2hTeams } from '../../../shared/interfaces/h2hInteresting.interface';
import { LoaderState } from '../../../shared/interfaces/team-profile.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-all-club',
  templateUrl: './search-all-club.component.html',
  styleUrls: ['./search-all-club.component.scss'],
})
export class SearchAllClubComponent implements OnInit, OnChanges {
  loaderState: LoaderState = {
    val: false,
  };
  page = 0;
  count = 10;
  public events!: H2hTeams[] | undefined;
  public allEvents: H2hTeams[] | undefined;
  constructor(private router: Router) { }
  @Input() pastMatches: H2hTeams[] | undefined;
  ngOnInit(): void { }
  ngOnChanges(): void {
    this.allEvents = this.pastMatches;
    if (this.pastMatches?.length) {
      this.more();
    }
  }
  more() {
    this.loaderState = {
      val: false,
    };
    this.page += 1;
    this.events = this.allEvents?.filter((_, i) => this.page * this.count > i);
  }

  navigateToH2h(firstTeamId: number, secondTeamId: number) {
    this.router.navigate(['h2h', firstTeamId, secondTeamId]);
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
