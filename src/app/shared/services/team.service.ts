import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {
  LastFixture,
  LeagueAndSeasons,
  SearchTeam,
  TeamGeneralInfo,
  TeamSecondaryInfo, TopScorer
} from "../interfaces/team-profile.interface";
import {Observable, BehaviorSubject} from "rxjs";
import {Upcoming} from "../interfaces/upcoming-match.interface";
import {Fixture} from "../interfaces/fixtures.interface";
import {MatchStatistics} from "../interfaces/stats.interface";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly api: string = environment.footballApiUrl;
  team!: SearchTeam;
  leagueSeasons: BehaviorSubject<LeagueAndSeasons[]> = new BehaviorSubject<LeagueAndSeasons[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getGeneralInfo(teamName: string | undefined): Observable<TeamGeneralInfo> {
    return this.http.post<TeamGeneralInfo>(`${this.api}/teams/profile/generalInfo`, {teamName})
  }

  getSecondaryInfo(teamId: number | undefined): Observable<TopScorer> {
    return this.http.post<TopScorer>(`${this.api}/teams/profile/secondaryInfo`, {teamId})
  }

  getUpcomingMatch(teamName: string | undefined): Observable<Upcoming | null> {
    return this.http.post<Upcoming | null>(`${this.api}/teams/upcomingMatch`, {teamName})
  }

  getFixtures(
    leagueResult: string,
    teamId: number | undefined,
    leagueId: number | undefined,
    seasonId: number | undefined | string,
    page: number,
    count: number = 10,
  ): Observable<Fixture[]> {
    return this.http.post<Fixture[]>(`${this.api}/teams/fixtures`,
      {teamId, leagueId, page, count, seasonId, leagueResult})
  }

  getMatchStatistics(
    teamId: number,
    leagueId: number | undefined,
    seasonId: number | undefined | number[] | string
  ): Observable<MatchStatistics> {
    return this.http.post<MatchStatistics>(`${this.api}/teams/matchStatistics`, {teamId, leagueId, seasonId})
  }

  getLastFixtures(teamName: string): Observable<LastFixture> {
    return this.http.post<LastFixture>(`${this.api}/teams/lastFixtures`, {teamName})
  }

  getPerformance(
    teamId: number,
    leagueId: number | undefined,
    seasonId: number | undefined | number[] | string,
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/teams/performance`, {teamId, leagueId, seasonId})
  }

  getGoalByMinutes(
    teamId: number,
    leagueId: number | undefined,
    seasonId: number | undefined | number[] | string,
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/teams/goals/byMinutes`, {teamId, leagueId, seasonId})
  }

  goalsProbabilities(
    teamId: number,
    leagueId: number | undefined,
    seasonId: number | undefined | number[] | string,
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/teams/goals/probabilities`, {teamId, leagueId, seasonId})
  }


  getPlayersStat(
    teamId: number | undefined,
    seasonId: number | undefined | string
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/teams/player/stats`, {teamId, seasonId})
  }

  getLeaguePlayerState(
    seasonId: number | undefined | string
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/teams/player/leagueStats`, { seasonId})
  }

  search(name: string): Observable<any> {
    return this.http.post<any>(`${this.api}/teams/search`, {name})
  }

  getCompetitionStandings(
    count: number,
    offset: number,
    seasonId: number | undefined | string,
    leagueId: number | undefined
  ) {
    return this.http.post<any>(`${this.api}/teams/competitionStandings`, {count, offset, seasonId, leagueId})
  }
}
