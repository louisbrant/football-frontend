import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-h2h',
  templateUrl: './h2h.component.html',
  styleUrls: ['./h2h.component.scss']
})
export class H2hComponent implements OnInit {

  homeWin = 4;
  draw = 2;
  awayWin = 1;
  constructor() { }

  ngOnInit(): void {
  }

  get homeWins(): number {
    return this.homeWin/(this.homeWin + this.draw + this.awayWin) * 100;
  }

  get awayWins(): number {
    return this.awayWin/(this.homeWin + this.draw + this.awayWin) * 100;
  }
}
