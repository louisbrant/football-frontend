import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, BehaviorSubject} from "rxjs";
import {Fixture} from "../interfaces/fixtures.interface";
import {H2hInterface} from "../interfaces/h2h.interface";
import {H2hInterestingInterface, H2hTeams} from "../interfaces/h2hInteresting.interface";
import {League, RecentlyPlayedInterface, TeamComparisionInterface} from "../interfaces/league.interface";

@Injectable({
  providedIn: 'root'
})
export class H2hService {
  private readonly api: string = environment.footballApiUrl;
  private interesting$ = new BehaviorSubject<H2hInterface[]>([]);
  league!: League | undefined;

  constructor(
    private http: HttpClient
  ) {
  }

  public interestingData$(): Observable<any[]> {
    return this.interesting$.asObservable();
  }

  getGoalMinutes(
    teamId: number,
    seasonId: number | undefined | string
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/teams/goals/byMinutes`, {teamId, seasonId})
  }

  fixtures(
    count: number,
    page: number,
    firstTeamId: number,
    secondTeamId: number
  ): Observable<Fixture[]> {
    return this.http.post<Fixture[]>(`${this.api}/h2h/fixtures`, {count, page, firstTeamId, secondTeamId})
  }

  getH2hInterestingData(): void {
    this.http.get<H2hInterestingInterface[]>(`${this.api}/h2h/fixtures`).subscribe(data => {
      const interestingData: H2hInterface[] = [];
      data?.forEach((el: H2hInterestingInterface) => {
        if (el?.localteam_id === el.winner_team_id) {
          interestingData.push({
            winnerTeamName: el.local_team.name, winnerTeamLogo: el.local_team.logo_path, winnerTeamScore: el.localteam_score,
            failedTeamName: el.visitor_team.name, failedTeamLogo: el.visitor_team.logo_path, failedTeamScore: el.visitorteam_score})
        } else {
          interestingData.push({
            winnerTeamName: el.visitor_team.name, winnerTeamLogo: el.visitor_team.logo_path, winnerTeamScore: el.visitorteam_score,
            failedTeamName: el.local_team.name, failedTeamLogo: el.local_team.logo_path, failedTeamScore: el.localteam_score})
        }
      })
      this.interesting$.next(interestingData)
    })
  }

  getTeamH2h(teamId: number | undefined): Observable<H2hInterestingInterface[]> {
    return this.http.get<H2hInterestingInterface[]>(`${this.api}/h2h/fixtures/${teamId}`)
  }

  teamsH2h(firstTeamId: number, secondTeamId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/h2h/teams/${firstTeamId}/${secondTeamId}`)
  }

  firstTeamRecentlyPlayed(teamId: number | undefined, recently: boolean): Observable<RecentlyPlayedInterface> {
    return this.http.get<RecentlyPlayedInterface>(`${this.api}/h2h/recently/${teamId}/${recently}`)
  }

  teamData(teamId: number | undefined, seasonId: number | undefined | string): Observable<TeamComparisionInterface[]> {
    return this.http.get<TeamComparisionInterface[]>(`${this.api}/h2h/team/comparision/${teamId}/${seasonId}`)
  }
}
