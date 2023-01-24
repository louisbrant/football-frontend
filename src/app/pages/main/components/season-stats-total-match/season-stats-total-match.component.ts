import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-season-stats-total-match',
  templateUrl: './season-stats-total-match.component.html',
  styleUrls: ['./season-stats-total-match.component.scss']
})
export class SeasonStatsTotalMatchComponent implements OnInit {
  list = [
    {
      total: 'Over 0.5',
      home: {
        home: 100,
        away: 100
      },
      away: {
        home: 100,
        away: 100
      }
    },
    {
      total: 'Over 1.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Over 2.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Over 3.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Over 3.5Over 4.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Over 5.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Under 0.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Under 1.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Under 2.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Under 3.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Under 4.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
    {
      total: 'Under 5.5',
      home: {
        home: 100,
        away: 83
      },
      away: {
        home: 100,
        away: 83
      }
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
