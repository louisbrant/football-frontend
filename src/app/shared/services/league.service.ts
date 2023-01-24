import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, BehaviorSubject} from "rxjs";
import {GeneralInfoLeague, PastChampions, SeachLeague} from "../interfaces/league.interface";
import {Fixture, FixtureData} from "../interfaces/fixtures.interface";
import {DetailStats, GeneralStats} from "../interfaces/stats.interface";
import {SeasonsOfLeague} from "../interfaces/team-profile.interface";
import {H2hInterestingInterface} from "../interfaces/h2hInteresting.interface";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private readonly api: string = environment.footballApiUrl;
  league!: SeachLeague;
  seasons: BehaviorSubject<SeasonsOfLeague[]> = new BehaviorSubject<SeasonsOfLeague[]>([]);

  constructor(
    private http: HttpClient
  ) {
  }
  public getSeason(): Observable<SeasonsOfLeague[]> {
    return this.seasons.asObservable();
  }

  getGeneralInfo(leagueName: string): Observable<GeneralInfoLeague> {
    return this.http.post<GeneralInfoLeague>(`${this.api}/league/generalInfo`, {leagueName})
  }

  getLeagueSeasons(leagueId: number): Observable<SeasonsOfLeague[]> {
    return this.http.post<SeasonsOfLeague[]>(`${this.api}/league/getLeagueSeasons`, {leagueId})
  }

  getOverallStats(
    leagueId: number,
    seasonId: number | undefined | string
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/league/overallStats`, {leagueId, seasonId})
  }

  getFixtures(
    count: number,
    page: number,
    leagueId: number,
    seasonId: number | undefined | string,
    leagueResult: string
  ): Observable<FixtureData> {
    return this.http.post<FixtureData>(`${this.api}/league/fixtures`, {count, page, leagueId, seasonId, leagueResult})
  }

  getDetailStats(
    leagueId: number,
    seasonId: number | undefined | string
  ): Observable<DetailStats[]> {
    return this.http.post<DetailStats[]>(`${this.api}/league/detailStats`, {leagueId, seasonId})
  }

  getGeneralStats(
    leagueId: number,
    seasonId: number | undefined | string
  ): Observable<GeneralStats[]> {
    return this.http.post<GeneralStats[]>(`${this.api}/league/generalStats`, {leagueId, seasonId})
  }

  search(name: string): Observable<SeachLeague> {
    return this.http.post<SeachLeague>(`${this.api}/league/search`, {name})
  }

  seasonsOfLeague(leagueId: number): Observable<any> {
    return this.http.post<any>(`${this.api}/league/seasons`, {leagueId})
  }
  pastChampions(seasonIds: number[]): Observable<PastChampions[]> {
    return this.http.post<PastChampions[]>(`${this.api}/league/pastChampions`, seasonIds)
  }

  seasonStartEndDate(seasonId: number): Observable<any> {
    return this.http.post<any>(`${this.api}/league/seasonDates`, {seasonId})
  }

  getH2hByLeagueId(leagueId: number): Observable<H2hInterestingInterface[]> {
    return this.http.get<H2hInterestingInterface[]>(`${this.api}/h2h/${leagueId}`)
  }
}
