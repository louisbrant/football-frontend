import {Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Upcoming} from "../interfaces/upcoming-match.interface";

@Injectable({
  providedIn: 'root'
})
export class UpcomingMatchesService {

  private readonly api: string = environment.footballApiUrl;

  constructor(private http: HttpClient) { }

  upcomingMatches(page: number, perPage: number, dateFrom: string, dateTo: string): Observable<Upcoming[]> {
    return this.http.post<Upcoming[]>(`${this.api}/matches/upcoming`, {page, perPage, dateFrom, dateTo})
  }
}
