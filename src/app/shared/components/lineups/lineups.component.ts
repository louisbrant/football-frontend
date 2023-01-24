import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {LiveEventsService} from "../../services/live-events.service";
import {LineupInterFace, MatchInterface} from "../../interfaces/match.interface";

@Component({
  selector: 'app-lineups',
  templateUrl: './lineups.component.html',
  styleUrls: ['./lineups.component.scss']
})
export class LineupsComponent implements OnInit, OnChanges {
  lineups!: LineupInterFace[] | undefined;
  visitorTeamBench!: LineupInterFace[];
  localTeamBench!: LineupInterFace[];

  constructor(private readonly _liveEventsService: LiveEventsService) {
  }
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
    this.lineups = this.matchData?.lineup;
    const groupByTeams = this.groupBy(this.matchData?.bench, 'team_id');
    if (this.matchData?.localTeam.id) {
      this.localTeamBench = groupByTeams?.[this.matchData?.localTeam?.id];
    }
    if (this.matchData?.visitorTeam.id) {
      this.visitorTeamBench = groupByTeams?.[this.matchData?.visitorTeam.id];
    }
  }

}
