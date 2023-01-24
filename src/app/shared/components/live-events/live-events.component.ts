import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LiveEventsService } from "../../services/live-events.service";
import { LiveEventsLeagueInterface } from "../../interfaces/live-events-league.interface";
import { LoaderState } from "../../interfaces/team-profile.interface";
import { Router } from "@angular/router";
import { TeamService } from '../../services/team.service';
import { Upcoming } from '../../interfaces/upcoming-match.interface';

import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-live-events',
  templateUrl: './live-events.component.html',
  styleUrls: ['./live-events.component.scss']
})
export class LiveEventsComponent implements OnInit {
  @Input() showupcoming: boolean = true;
  events: any[] = [];
  allEvents: any[] = [];
  loaderState: LoaderState = {
    val: false
  };
  page = 0;
  count = 10;
  @Input() title: string = 'Upcoming Match';
  @Input() teamName!: string | undefined;
  @Input() upcomingMatch?: Upcoming | null;
  @Input() showprediction?: Boolean | false;
  upcoming!: Upcoming | null | undefined;

  constructor(
    private readonly liveEventsService: LiveEventsService,
    private readonly teamService: TeamService,
    private readonly router: Router
  ) {
  }




  private subscription: Subscription | undefined;

  public milliSecondsInASecond = 1000;
  public hoursInADay = 24;
  public minutesInAnHour = 60;
  public SecondsInAMinute = 60;

  public secondsToDday: number | undefined;
  public minutesToDday: number | undefined;
  public hoursToDday: number | undefined;
  public daysToDday: number | undefined;

  private getTimeDifference() {
    if (this.upcoming?.dateTime) {
      const timeDifference =
        this.upcoming.dateTime.getTime() - new Date().getTime();
      this.allocateTimeUnits(timeDifference);
    }
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
      this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
      this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
      (this.milliSecondsInASecond *
        this.minutesInAnHour *
        this.SecondsInAMinute *
        this.hoursInADay)
    );
  }

  @Output() informParent = new EventEmitter();

  ngOnInit(): void {
    this.initializeValues();
    if (this.teamName) {
      this.teamService.getUpcomingMatch(this.teamName).subscribe((res) => {
        this.upcoming = res;
        if (res?.date && res?.time && this.upcoming) {
          this.upcoming.dateTime = new Date(`${res.date} ${res.time} UTC`);
        }
      });
    } else {
      if (this.upcomingMatch) {
        this.upcoming = this.upcomingMatch;
        this.upcoming.dateTime = new Date(`${this.upcomingMatch?.date} ${this.upcomingMatch?.time} UTC`);
      }
    }
    this.subscription = interval(1000).subscribe(() => {
      this.getTimeDifference();
    });

  }

  more() {
    this.loaderState = {
      val: false
    };
    this.page += 1;
    this.events = this.allEvents.filter((_, i) => this.page * this.count > i);

  }

  currentLeague(leagueName: string) {
    if (this.router.url.includes('league')) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/league', leagueName]);
      });
    } else {
      this.router.navigate(['/league', leagueName]);
    }

  }

  initializeValues() {
    this.liveEventsService.getLiveEvents().subscribe((res: LiveEventsLeagueInterface[]) => {
      this.allEvents = res;
      this.more();
    })
  }
  switchtab() {
    console.log("Sds");
    this.showupcoming = !this.showupcoming;
    console.log(this.showupcoming);
  }


  navigateToH2h(firstTeamId: number, secondTeamId: number) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['h2h', firstTeamId, secondTeamId]));
  }

  navigateToLeague(leagueName: string | undefined): void {
    this.router.navigate(['/league', leagueName]);
  }

  navigateToTeam(teamName: string | undefined): void {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['team', teamName]));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


}
