import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LiveEventsLeagueInterface} from "../interfaces/live-events-league.interface";
import {LineupsInterface} from "../interfaces/lineups.interface";
import {MatchInterface} from "../interfaces/match.interface";

@Injectable({
  providedIn: 'root'
})
export class LiveEventsService {

  private readonly api: string = environment.footballApiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getLiveEvents(): Observable<LiveEventsLeagueInterface[]> {
    return this.http.get<LiveEventsLeagueInterface[]>(`${this.api}/liveEvent`)
  }

  getLineUps(fixtureIds: number[]): Observable<LineupsInterface[]> {
    return this.http.post<LineupsInterface[]>(`${this.api}/liveEvent/lineUps`, fixtureIds)
  }

  getMatch(fixtureId: number): Observable<MatchInterface> {
    return this.http.get<MatchInterface>(`${this.api}/liveEvent/match/${fixtureId}`);
  }

  getFixtures(teamId: number): Observable<MatchInterface[]> {
    return this.http.get<MatchInterface[]>(`${this.api}/liveEvent/getFixtures/${teamId}`);
  }
}
