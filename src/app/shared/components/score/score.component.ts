import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  result!: number;
  _score: string = '';
  get score(): string {
    return this._score;
  }
  @Input() set score(value: string) {
    this._score = value;
    const [home, away] = this._score.split('-');
    this.result = Number(home) - Number(away);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
