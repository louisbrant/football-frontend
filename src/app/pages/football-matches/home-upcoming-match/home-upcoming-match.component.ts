import { Component, OnInit } from '@angular/core';
import {UpcomingMatchesService} from "../../../shared/services/upcoming-matches.service";
import {Upcoming} from "../../../shared/interfaces/upcoming-match.interface";

@Component({
  selector: 'app-home-upcoming-match',
  templateUrl: './home-upcoming-match.component.html',
  styleUrls: ['./home-upcoming-match.component.scss']
})
export class HomeUpcomingMatchComponent implements OnInit {

  public upcomings!: Upcoming[];
  public page: number = 1;
  public perPage: number = 50;
  public date = new Date();
  public year = this.date.getFullYear();
  public month = this.date.getMonth() + 1;
  public day = this.date.getDate();
  public today = [this.year, this.month, this.day].join('-');

  public currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  public nextDay = this.currentDate.getDate();
  public nextMonth = this.currentDate.getMonth() + 1;
  public nextYear = this.currentDate.getFullYear();
  public nextDate = [this.nextYear, this.nextMonth, this.nextDay].join('-');

  constructor(private readonly upcomingMatchesService: UpcomingMatchesService) { }

  ngOnInit(): void {
    this.initialize();
  }

  public initialize() {
    this.upcomingMatchesService.upcomingMatches(this.page, this.perPage, this.today, this.nextDate).subscribe(res => {
      this.upcomings = res;
    })
  }

}
