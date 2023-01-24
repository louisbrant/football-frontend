import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-season-stats-goals-conceeded',
  templateUrl: './season-stats-goals-conceeded.component.html',
  styleUrls: ['./season-stats-goals-conceeded.component.scss']
})
export class SeasonStatsGoalsConceededComponent implements OnInit {
  list = [
    {
      goalsScoring: '0-15',
      home: '4(12.5%)',
      away: '4(12.5%)',
    },
    {
      goalsScoring: '15-30',
      home: '4(12.5%)',
      away: '4(12.5%)',
    },
    {
      goalsScoring: '30-45',
      home: '4(12.5%)',
      away: '4(12.5%)',
    },
    {
      goalsScoring: '45-60',
      home: '4(12.5%)',
      away: '4(12.5%)',
    },
    {
      goalsScoring: '60-75',
      home: '4(12.5%)',
      away: '4(12.5%)',
    },
    {
      goalsScoring: '75-90',
      home: '4(12.5%)',
      away: '4(12.5%)',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
