import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-league-emblem',
  templateUrl: './league-emblem.component.html',
  styleUrls: ['./league-emblem.component.scss']
})
export class LeagueEmblemComponent implements OnInit {
  @Input() leagueEmblem?: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
