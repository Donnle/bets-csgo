import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, zip} from "rxjs";
import {Bet, Match, MatchEnd, Response} from "../interfaces/interfaces";
import {BetsService} from "./bets.service";

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  matches$: BehaviorSubject<Match[]> = new BehaviorSubject<Match[]>([]);
  bets: Bet[];

  constructor(private http: HttpClient, private betsService: BetsService) {
    this.getAllMatches$().subscribe((response: Response<Match[]>) =>
      (this.matches$.next(response.data))
    )

    this.betsService.bets$.subscribe((bets: Bet[]) => {
      this.bets = bets
    })

    this.checkFinishedMatches$().subscribe((response: Response<MatchEnd>[]) => {
      const actualBets: Bet[] = []
      response.forEach((matchEnd: Response<MatchEnd>) => {
        const {isMatchEnd, gameUrl, gameId, teamName, winner} = matchEnd.data

        const stats = JSON.parse(localStorage.getItem('stats')) || {wins: 0, loses: 0}

        if (isMatchEnd) {
          if (teamName === winner) {
            stats.wins += 1
            return localStorage.setItem('stats', JSON.stringify(stats))
          }
          stats.loses += 1
          return localStorage.setItem('stats', JSON.stringify(stats))
        }


        actualBets.push({gameUrl, gameId, teamName})
      })

      localStorage.setItem('bets', JSON.stringify(actualBets))
      this.betsService.bets$.next(actualBets)
    })
  }

  getAllMatches$(): Observable<Response<Match[]>> {
    return this.http.get<Response<Match[]>>('/api/all-matches')
  }

  isMatchFinished(bet: Bet): Observable<MatchEnd> {
    return this.http.post<MatchEnd>('/api/match-end', bet)
  }

  checkFinishedMatches$(): Observable<Response<MatchEnd>[]> {
    const actualBets: Observable<MatchEnd>[] = []
    this.bets.forEach((bet: Bet) => actualBets.push(this.isMatchFinished(bet)))
    return zip<Response<MatchEnd>[]>(actualBets as Observable<any>[])
  }
}
