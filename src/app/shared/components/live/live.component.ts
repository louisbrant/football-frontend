import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {EventInterface, LineupInterFace, MatchInterface} from "../../interfaces/match.interface";

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit, OnChanges {
  public liveMatch: MatchInterface | undefined;
  public localTeamEvents: EventInterface[] | undefined;
  public visitorTeamEvents: EventInterface[] | undefined;

  constructor() { }
  @Input() matchData: MatchInterface | undefined;

  ngOnInit(): void {
  }
  groupBy(array: LineupInterFace[] | undefined, key: string) {
    return array?.reduce((result: any, currentValue: any) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };
  ngOnChanges(): void {
    this.liveMatch = this.matchData;
    const groupByTeams = this.groupBy(this.matchData?.events, 'team_id');
    if (this.matchData?.localTeam.id) {
      this.localTeamEvents = groupByTeams[this.matchData?.localTeam.id];
    }
    if (this.matchData?.visitorTeam.id) {
      this.visitorTeamEvents = groupByTeams[this.matchData?.visitorTeam.id];
    }
  }

}
