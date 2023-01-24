import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-match-stats',
  templateUrl: './teams-match-stats.component.html',
  styleUrls: ['./teams-match-stats.component.scss']
})
export class TeamsMatchStatsComponent implements OnInit {
  list = [
    {
      performance: 'Shots Total',
      home: 2,
      away: 5
    },
    {
      performance: 'Shots On Target',
      home: 2,
      away: 5
    },
    {
      performance: 'Shots Blocked',
      home: 2,
      away: 5
    },
    {
      performance: 'Shots Off Target',
      home: 2,
      away: 5
    },
    {
      performance: 'Shots Inside Box',
      home: 2,
      away: 5
    },
    {
      performance: 'Shots Outside Box',
      home: 2,
      away: 5
    },
    {
      performance: 'Passes Total',
      home: 2,
      away: 5
    },
    {
      performance: 'Accurate Passes',
      home: 2,
      away: 5
    },
    {
      performance: 'Pass Accuracy %',
      home: 2,
      away: 5
    },
    {
      performance: 'Total Attacks',
      home: 2,
      away: 5
    },
    {
      performance: 'Dangerous Attacks',
      home: 2,
      away: 5
    },
    {
      performance: 'Fouls',
      home: 2,
      away: 5
    },
    {
      performance: 'Corners',
      home: 2,
      away: 5
    },
    {
      performance: 'Offsides',
      home: 2,
      away: 5
    },
    {
      performance: 'Possession Time',
      home: 2,
      away: 5
    },
    {
      performance: 'Yellow Cards',
      home: 2,
      away: 5
    },
    {
      performance: 'Red Cards',
      home: 2,
      away: 5
    },
    {
      performance: 'Yellow Red Cards',
      home: 2,
      away: 5
    },
    {
      performance: 'Saves',
      home: 2,
      away: 5
    },
    {
      performance: 'Substitutions',
      home: 2,
      away: 5
    },
    {
      performance: 'Goal Kicks',
      home: 2,
      away: 5
    },
    {
      performance: 'Goal Attampts',
      home: 2,
      away: 5
    },
    {
      performance: 'Free Kickss',
      home: 2,
      away: 5
    },
    {
      performance: 'Throw Ins',
      home: 2,
      away: 5
    },
    {
      performance: 'Ball Safe',
      home: 2,
      away: 5
    },
    {
      performance: 'Goals',
      home: 2,
      away: 5
    },
    {
      performance: 'Penalties',
      home: 2,
      away: 5
    },
    {
      performance: 'Injuries',
      home: 2,
      away: 5
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
