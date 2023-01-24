import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {LeagueAndSeasons} from "../../interfaces/team-profile.interface";

enum defaultLeague {
  All = 'All'
}

@Component({
  selector: 'app-select-league',
  templateUrl: './select-league.component.html',
  styleUrls: ['./select-league.component.scss']
})
export class SelectLeagueComponent implements OnChanges, OnInit{

  @Input() leagues: LeagueAndSeasons[] = [];
  @Output() selectedLeague = new EventEmitter();
  @Input() curLeague: number | string | undefined;
  @Input() allSelected?: boolean;
  constructor() { }

  change() {
    if (/^\d+$/.test(<string>this.curLeague)) {
      this.selectedLeague.emit(Number(this.curLeague));
    } else {
      this.selectedLeague.emit(this.curLeague);
    }
  }

  ngOnChanges(): void {
    this.allSelected ? this.curLeague = defaultLeague.All : this.curLeague;
  }

  ngOnInit(): void {
    if (this.allSelected) {
      this.selectedLeague.emit(undefined)
    }
  }

}
