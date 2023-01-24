import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-players-comparison',
  templateUrl: './top-players-comparison.component.html',
  styleUrls: ['./top-players-comparison.component.scss']
})
export class TopPlayersComparisonComponent implements OnInit {
  list = [
    {
      performance: 'Top Scorer',
      home: 'Messi (12)',
      away: 'Lampard (10)'
    },
    {
      performance: 'Top Assists',
      home: 'Beckham (15)',
      away: 'Drogba (14)'
    },
    {
      performance: 'Most Appearances',
      home: 'Scoles (21)',
      away: 'Wise (18)'
    },
    {
      performance: 'Most Mins Played',
      home: 'Ronaldo (1258)',
      away: 'Pearce (2154)'
    },
    {
      performance: 'Most Cards',
      home: 'Giggs (5)',
      away: 'Jones (2)'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
