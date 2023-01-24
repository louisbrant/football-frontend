import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { UnsubscribeDirective } from '../../../../shared/directive/unsubscribe.directive';
import { TeamService } from '../../../../shared/services/team.service';
import { takeUntil } from 'rxjs/operators';
import {
  LastFixture,
  TeamGeneralInfo,
  TeamSecondaryInfo,
  TopScorer,
} from '../../../../shared/interfaces/team-profile.interface';
import { isEmptyObject } from '../../../../shared/helper/isEmptyObject';
import { forkJoin } from 'rxjs';
import { SearchService } from '../../../../shared/services/search.service';
import { SearchInterface } from '../../../../shared/interfaces/search.interface';
import { Router } from '@angular/router';
import { H2hService } from "../../../../shared/services/h2h.service";

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss'],
})
export class TeamProfileComponent
  extends UnsubscribeDirective
  implements OnInit {
  generalInfo!: TeamGeneralInfo;
  secondaryInfo!: TopScorer;
  lastFixtures: LastFixture | undefined;
  homeForm: string[] = [];
  awayForm: string[] = [];
  teamProfiles?: SearchInterface[] = [];
  generalInfoLogo!: string | undefined;
  @Input() teamId!: number | undefined;
  @Input() seasonId!: number | undefined;

  constructor(
    private readonly teamService: TeamService,
    private readonly searchService: SearchService,
    private router: Router,
    private readonly h2hService: H2hService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeValues();
    this.teamService.getPlayersStat(
      this.teamId,
      this.seasonId
    )
      .pipe(
        takeUntil(this.subscription)
      )
      .subscribe(res => {
        this.generalInfoLogo = res?.team?.logo_path;
        console.log(res);
      })
    // this.teamService.getSecondaryInfo(this.teamService.team.name, this.teamService.team.seasonId)
    //   .pipe(
    //     takeUntil(this.subscription)
    //   ).subscribe(res => this.secondaryInfo = isEmptyObject(res) ? undefined : res);
    // this.teamService.getLastFixtures(this.teamService.team.name)
    //   .pipe(
    //     takeUntil(this.subscription)
    //   ).subscribe(res => this.lastFixtures = isEmptyObject(res) ? undefined : res)
  }

  searchTeams(name: string) {
    if (name?.length > 1) {
      this.searchService.search(name, true).subscribe((profiles) => {
        this.teamProfiles = profiles;
      });
    }
  }

  initializeValues() {
    forkJoin([
      this.teamService.getGeneralInfo(this.teamService.team.name),
      this.teamService.getSecondaryInfo(this.teamService.team.id),
      this.h2hService.firstTeamRecentlyPlayed(this.teamService.team.id, true)
    ]).subscribe((results: any) => {
      this.generalInfo = results[0];
      this.secondaryInfo = results[1];
      this.homeForm = results[2]?.homeForm;
      this.awayForm = results[2]?.awayForm;

    });
  }

  navigateToPlayerProfile(playerName: unknown) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['player', playerName]));
  }

  navigateToH2h(firstTeamId: number, secondTeamId: number) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['h2h', firstTeamId, secondTeamId]));
  }
}
