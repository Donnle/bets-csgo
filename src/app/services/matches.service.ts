import {Injectable} from '@angular/core';
import {AllMatchesResponse, Match, Response} from "../interfaces/interfaces";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  matches$: BehaviorSubject<Match[]> = new BehaviorSubject<Match[]>([])

  constructor(private http: HttpClient) {
    this.http
      .get<Response<AllMatchesResponse>>('/api/all-matches')
      .subscribe((response: Response<AllMatchesResponse>) => (this.matches$.next(response.data.matches)))
  }
}
