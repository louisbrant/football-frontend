import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-h2h-teams',
  templateUrl: './h2h-teams.component.html',
  styleUrls: ['./h2h-teams.component.scss']
})
export class H2hTeamsComponent implements OnInit {
  list = [
    {
      title: 'Venue Name',
      value: 'Santiago Bernabéu Stadium'
    },
    {
      title: 'Capacity',
      value: '57,500'
    },
    {
      title: 'City',
      value: 'Madrid'
    },
    {
      title: 'Country',
      value: 'Spain'
    },
    {
      title: 'Coach',
      value: 'Carlo Ancelotti'
    },
    {
      title: 'Top Scorer',
      value: 'Benzema (45)'
    },
    {
      title: 'Domestic League Rank',
      value: 2
    },
    {
      title: 'Home Form',
      value: ['W', 'W', 'L', 'W', 'L'],
      isIcons: true
    },
    {
      title: 'Away Form',
      value: ['W', 'W', 'W', 'L', 'W'],
      isIcons: true
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
