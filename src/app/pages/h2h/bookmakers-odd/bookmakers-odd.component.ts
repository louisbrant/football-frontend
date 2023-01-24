import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatchInterface } from '../../../shared/interfaces/match.interface';
import { H2hTeams } from '../../../shared/interfaces/h2hInteresting.interface';
import { Odds } from '../../../shared/interfaces/odd.interface';
import { LoaderState } from '../../../shared/interfaces/team-profile.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmakers-odd',
  templateUrl: './bookmakers-odd.component.html',
  styleUrls: ['./bookmakers-odd.component.scss'],
})
export class BookmakersOddComponent implements OnInit, OnChanges {
  loaderState: LoaderState = {
    val: false,
  };
  page = 0;
  count = 10;
  public events!: H2hTeams[] | undefined;
  public odds!: Odds[] | undefined;
  public allEvents: H2hTeams[] | undefined;
  constructor(private router: Router) { }
  @Input() pastMatches: H2hTeams[] | undefined;
  @Input() allodds: Odds[] | undefined;
  ngOnInit(): void { }
  ngOnChanges(): void {
    // console.log("this.pastMatches=>", this.allodds);
    this.allodds = [{
      id: 3,
      bookmakerimg: 'assets/images/bookmarkers/4rabet.png',
      bookmakername: '4RABET',
      isopen: true,
      showtype: 'resume',
      hrtype: '1',
      odd: {
        home: 2.5,
        draw: 5.2,
        away: 2.6
      },
      openodd: {
        home: 1.5,
        draw: 3.2,
        away: 6.6
      },
    }, {
      id: 3,
      bookmakerimg: 'assets/images/bookmarkers/4rabet.png',
      bookmakername: '4RABET',
      isopen: true,
      showtype: 'resume',
      hrtype: '1.5',
      odd: {
        home: 2.5,
        draw: 5.1,
        away: 2.4
      },
      openodd: {
        home: 1.2,
        draw: 3.4,
        away: 6.6
      },
    }, {
      id: 3,
      bookmakerimg: 'assets/images/bookmarkers/4rabet.png',
      bookmakername: '4RABET',
      isopen: true,
      showtype: 'resume',
      hrtype: '2.5',
      odd: {
        home: 2.7,
        draw: 5.5,
        away: 2.3
      },
      openodd: {
        home: 1.4,
        draw: 3.5,
        away: 6.8
      },
    }, {
      id: 3,
      bookmakerimg: 'assets/images/bookmarkers/4rabet.png',
      bookmakername: '4RABET',
      isopen: true,
      showtype: 'HA',
      hrtype: '1',
      odd: {
        home: 2.4,
        draw: 5.6,
        away: 2.9
      },
      openodd: {
        home: 1.3,
        draw: 3.2,
        away: 6.8
      },
    }, {
      id: 3,
      bookmakerimg: 'assets/images/bookmarkers/4rabet.png',
      bookmakername: '4RABET',
      isopen: true,
      showtype: 'HA',
      hrtype: '1.5',
      odd: {
        home: 2.3,
        draw: 5.5,
        away: 2.9
      },
      openodd: {
        home: 1.8,
        draw: 3.5,
        away: 6.3
      },
    }, {
      id: 3,
      bookmakerimg: 'assets/images/bookmarkers/4rabet.png',
      bookmakername: '4RABET',
      isopen: false,
      showtype: 'HA',
      hrtype: '2',
      odd: {
        home: 2.7,
        draw: 5.5,
        away: 2.4
      },
      openodd: {
        home: 1.5,
        draw: 3.3,
        away: 6.4
      },
    }, {
      id: 3,
      bookmakerimg: 'assets/images/bookmarkers/10bet.png',
      bookmakername: '10BET',
      isopen: true,
      showtype: 'resume',
      hrtype: '1',
      odd: {
        home: 2.6,
        draw: 5.8,
        away: 2.0
      },
      openodd: {
        home: 1.7,
        draw: 3.3,
        away: 6.2
      },
    }, {
      id: 3,
      bookmakerimg: 'assets/images/bookmarkers/4rabet.png',
      bookmakername: 'resume',
      isopen: true,
      showtype: 'HA',
      hrtype: '1.5',
      odd: {
        home: 2.4,
        draw: 5.7,
        away: 2.4
      },
      openodd: {
        home: 1.4,
        draw: 3.6,
        away: 6.9
      },
    }, {
      id: 3,
      bookmakerimg: 'assets/images/bookmarkers/4rabet.png',
      bookmakername: 'resume',
      isopen: true,
      showtype: 'HA',
      hrtype: '2',
      odd: {
        home: 2.2,
        draw: 5.3,
        away: 2.4
      },
      openodd: {
        home: 1.5,
        draw: 3.6,
        away: 6.9
      },
    }]
    this.allEvents = this.pastMatches;
    if (this.pastMatches?.length) {
      this.more();
    }
  }
  changeShowType(value: string) {
    if (/^\d+$/.test(value)) {
      // console.log(value)
    } else {
      // console.log(value);
    }

  }
  more() {
    this.loaderState = {
      val: false,
    };
    this.page += 1;
    this.events = this.allEvents?.filter((_, i) => this.page * this.count > i);
    this.odds = this.allodds?.filter((_, i) => this.page * this.count > i);
  }

  navigateToH2h(firstTeamId: number, secondTeamId: number) {
    this.router.navigate(['h2h', firstTeamId, secondTeamId]);
    window.scroll({ top: 0, behavior: 'smooth' });
  }
}
