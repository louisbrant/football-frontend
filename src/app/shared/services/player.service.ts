import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {GeneralInfo, PlayerStats} from "../interfaces/player.interface";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly api: string = environment.footballApiUrl;

  player!: GeneralInfo;

  constructor(
    private http: HttpClient
  ) { }

  generalInfo(name: string): Observable<GeneralInfo> {
    return this.http.post<GeneralInfo>(`${this.api}/players/generalInfo`, {name})
  }

  getStats(
    playerId: number,
    leagueId: number | undefined,
    seasonId: number | undefined | string
  ): Observable<PlayerStats> {
    return this.http.post<PlayerStats>(`${this.api}/players/stats`, {playerId, leagueId, seasonId})
  }
}
