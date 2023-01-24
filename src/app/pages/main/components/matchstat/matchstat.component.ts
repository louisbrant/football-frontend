import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchstat',
  templateUrl: './matchstat.component.html',
  styleUrls: ['./matchstat.component.scss']
})
export class MatchstatComponent implements OnInit {
  list = [
    {
      column1Title: 'BTTS',
      column1Value: 50.66,
      column2Title: 'HT Over 0.5',
      column2Value: 78.8,
    },
    {
      column1Title: 'Over 0.5',
      column1Value: 50.66,
      column2Title: 'HT Under 0.5',
      column2Value: 78.8,
    },
    {
      column1Title: 'Under 0.5',
      column1Value: 50.66,
      column2Title: 'HT Over 1.5',
      column2Value: 78.8,
    },
    {
      column1Title: 'Over 1.5',
      column1Value: 50.66,
      column2Title: 'HT Under 1.5',
      column2Value: 78.8,
    },
    {
      column1Title: 'Under 1.5',
      column1Value: 50.66,
      column2Title: 'Home Win',
      column2Value: 78.8,
    },
    {
      column1Title: 'Over 2.5',
      column1Value: 50.66,
      column2Title: 'Away Win',
      column2Value: 78.8,
    },
    {
      column1Title: 'Under 2.5',
      column1Value: 50.66,
      column2Title: 'Draw',
      column2Value: 78.8,
    },
    {
      column1Title: 'Over 3.5',
      column1Value: 50.66,
      column2Title: 'Most Likely Score',
      column2Value: 78.8,
    },
    {
      column1Title: 'Under 3.5',
      column1Value: 50.66,
      column2Title: '2nd Most Likely Score',
      column2Value: 78.8,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
