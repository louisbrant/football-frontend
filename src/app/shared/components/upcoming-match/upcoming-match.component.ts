import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Upcoming } from '../../interfaces/upcoming-match.interface';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeDirective } from '../../directive/unsubscribe.directive';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-match',
  templateUrl: './upcoming-match.component.html',
  styleUrls: ['./upcoming-match.component.scss'],
})
export class UpcomingMatchComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Upcoming Match';
  @Input() teamName!: string | undefined;
  @Input() upcomingMatch?: Upcoming | null;
  @Input() showprediction?: Boolean | false;
  upcoming!: Upcoming | null | undefined;
  constructor(
    private readonly teamService: TeamService,
    private router: Router
  ) { }

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

  ngOnInit(): void {
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
