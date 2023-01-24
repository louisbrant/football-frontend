import { Component, Input, OnInit } from '@angular/core';
import {
  TeamGeneralInfo,
  TopScorer,
} from '../../../shared/interfaces/team-profile.interface';
import { TeamService } from '../../../shared/services/team.service';
import { switchMap } from 'rxjs/operators';
import { H2hTeams } from '../../../shared/interfaces/h2hInteresting.interface';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
})
export class TeamInfoComponent implements OnInit {
  firstTeamGeneralInfo!: TeamGeneralInfo;
  secondTeamGeneralInfo!: TeamGeneralInfo;
  firstTeamLogo!: string | undefined;
  secondTeamLogo!: string | undefined;

  constructor(private readonly _teamService: TeamService) { }
  @Input() allMatches: H2hTeams[] | undefined;
  @Input() firstTeam: TopScorer | undefined;
  @Input() secondTeam: TopScorer | undefined;
  @Input() firstTeamForm?: { homeForm: string, awayForm: string };
  @Input() secondTeamForm?: { homeForm: string, awayForm: string };

  @Input() firstTeamId?: number;
  @Input() secondTeamId?: number;

  ngOnInit(): void {

    this.firstTeamLogo = this.allMatches?.find(
      (t) => t.homeTeam.id == this.firstTeamId
    )?.homeTeam.logo_path;
    this.secondTeamLogo = this.allMatches?.find(
      (t) => t.homeTeam.id == this.secondTeamId
    )?.homeTeam.logo_path;
    this._teamService
      .getGeneralInfo(this.firstTeam?.name)
      .pipe(
        switchMap((res) => {
          this.firstTeamGeneralInfo = res;
          return this._teamService.getGeneralInfo(this.secondTeam?.name);
        })
      )
      .subscribe((res: any) => {
        this.secondTeamGeneralInfo = res;
      });
  }
}
