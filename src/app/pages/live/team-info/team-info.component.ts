import { Component, Input, OnInit } from '@angular/core';
import {
  TeamGeneralInfo,
  TopScorer,
} from '../../../shared/interfaces/team-profile.interface';
import { TeamService } from '../../../shared/services/team.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
})
export class TeamInfoComponent implements OnInit {
  firstTeamGeneralInfo!: TeamGeneralInfo;
  secondTeamGeneralInfo!: TeamGeneralInfo;

  constructor(private readonly _teamService: TeamService) {}
  @Input() firstTeam: TopScorer | undefined;
  @Input() secondTeam: TopScorer | undefined;
  @Input() firstTeamForm?: {homeForm: string, awayForm:string};
  @Input() secondTeamForm?: {homeForm: string, awayForm:string};

  ngOnInit(): void {
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
