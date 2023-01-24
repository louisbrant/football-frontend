import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LeagueAndSeasons, SeasonsOfLeague } from "../../interfaces/team-profile.interface";

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent {

  @Input() title: string = '';
  @Input() hasSelectLeague: boolean = false;
  @Input() hasSelectYear: boolean = false;
  @Input() hasSelectRange: boolean = false;
  @Input() nonebb: boolean = false;
  @Input() leaguestat: boolean = false;
  @Input() seasons: SeasonsOfLeague[] = [];
  @Input() curSeason: number | undefined | string;
  @Output() selectedSeason = new EventEmitter<number>();
  @Input() leagues: LeagueAndSeasons[] = [];
  @Input() curLeague: number | undefined;
  @Output() selectedLeague = new EventEmitter<number>();
}
