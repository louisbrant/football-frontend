import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeagueAndSeasonsService {
  private readonly api: string = environment.footballApiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getLeagueAndSeasons(teamId: number | undefined): Observable<any> {
    return this.http.post<any>(`${this.api}/leagueAndSeasons`, {teamId})
  }
}
