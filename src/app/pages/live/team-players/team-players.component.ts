import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TeamService} from "../../../shared/services/team.service";
import {TopScorer} from "../../../shared/interfaces/team-profile.interface";
import {H2hService} from "../../../shared/services/h2h.service";

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.scss']
})
export class TeamPlayersComponent implements OnInit, OnChanges {
  firstTeamData: TopScorer | undefined;
  secondTeamData: TopScorer | undefined;

  constructor(private readonly _teamService: TeamService,
              private readonly _h2hService: H2hService) {
  }

  @Input() firstTeam: TopScorer | undefined;
  @Input() secondTeam: TopScorer | undefined


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
      this.firstTeamData = changes['firstTeam'].currentValue;
      this.secondTeamData = changes['secondTeam'].currentValue;
      this._h2hService.league = this.firstTeamData?.league?.data

  }


}
