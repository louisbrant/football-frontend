import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LiveEventsService} from "../../shared/services/live-events.service";
import {MatchInterface} from "../../shared/interfaces/match.interface";

@Component({
  selector: 'app-match-live',
  templateUrl: './match-live.component.html',
  styleUrls: ['./match-live.component.scss']
})
export class MatchLiveComponent implements OnInit {
  public fixtureId: string;
  public matchData: MatchInterface | undefined;
  public loading: boolean = false;

  constructor(private readonly route: ActivatedRoute,
              private readonly liveEventService: LiveEventsService) {
    this.fixtureId = this.route.snapshot.params['fixtureId'];
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues() {
    this.liveEventService.getMatch(+this.fixtureId).subscribe(res => {
      this.matchData = res;
      this.loading = true;
    },(err) => this.loading = false);
  }
}









