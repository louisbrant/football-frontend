import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-season-stats-combined',
  templateUrl: './season-stats-combined.component.html',
  styleUrls: ['./season-stats-combined.component.scss']
})
export class SeasonStatsCombinedComponent implements OnInit {
  list = [
    {
      combined: 'Attacks',
      home: 2445,
      away: 3254
    },
    {
      combined: 'Dangerous Attacks',
      home: 1534,
      away: 1534
    },
    {
      combined: 'Av Possesion Percent',
      home: 55,
      away: 55
    },
    {
      combined: 'Fouls',
      home: 55,
      away: 55
    },
    {
      combined: 'Av Fouls Per Game',
      home: 55,
      away: 55
    },
    {
      combined: 'Offside',
      home: 55,
      away: 55
    },
    {
      combined: 'Redcards',
      home: 55,
      away: 55
    },
    {
      combined: 'Yellow Cards',
      home: 55,
      away: 55
    },
    {
      combined: 'Shots Blocked',
      home: 55,
      away: 55
    },
    {
      combined: 'Shots Off Target',
      home: 55,
      away: 55
    },
    {
      combined: 'Av Shots Off Target',
      home: 55,
      away: 55
    },
    {
      combined: 'Shots On Target',
      home: 55,
      away: 55
    },
    {
      combined: 'Av Shots On Target',
      home: 55,
      away: 55
    },
    {
      combined: 'Total Corners',
      home: 55,
      away: 55
    },
    {
      combined: 'Av Corners',
      home: 55,
      away: 55
    },
    {
      combined: 'BTTS',
      home: 55,
      away: 55
    },
    {
      combined: 'Av Player Rating Per Match',
      home: 55,
      away: 55
    },
    {
      combined: 'Av Player Ratingh',
      home: 55,
      away: 55
    },
    {
      combined: 'Tackles',
      home: 55,
      away: 55
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
