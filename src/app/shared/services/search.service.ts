import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {SearchInterface} from "../interfaces/search.interface";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly api: string = environment.footballApiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  search(name: string, isTeam?: boolean): Observable<SearchInterface[]> {
    return this.http.post<SearchInterface[]>(`${this.api}/search`, {name, isTeam})
  }

}
