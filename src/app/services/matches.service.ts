import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, zip} from "rxjs";
import {Bet, Match, MatchEnd, Response, Stats} from "../interfaces/interfaces";
import {BetsService} from "./bets.service";
import {AdditionalService} from "./additional.service";
import {StatsService} from "./stats.service";
import {BalanceService} from "./balance.service";

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  matches$: BehaviorSubject<Match[]> = new BehaviorSubject<Match[]>([]);
  bets: Bet[];
  stats: Stats;

  constructor(
    private http: HttpClient,
    private betsService: BetsService,
    private statsService: StatsService,
    private additionalService: AdditionalService,
    private balanceService: BalanceService
  ) {
    this.getAllMatches().subscribe((response: Response<Match[]>) => {
      this.matches$.next(response.data)
    })

    this.betsService.bets$.subscribe((bets: Bet[]) => {
      this.bets = bets
    })

    this.statsService.stats$.subscribe((stats: Stats) => {
      this.stats = stats
    })

    this.checkFinishedMatches$().subscribe((response: Response<MatchEnd>[]) => {
      const actualBets: Bet[] = []
      response.forEach((matchEnd: Response<MatchEnd>) => {
        const {gameUrl, gameId, teamName, beginsInTime, moneyBetAmount} = matchEnd.data
        const isMatchEnd = this.calculateResult(matchEnd)

        if (!isMatchEnd) {
          actualBets.push({gameUrl, gameId, teamName, beginsInTime, moneyBetAmount})
        }
      })

      this.betsService.setBets(actualBets)
    })
  }

  getAllMatches(): Observable<Response<Match[]>> {
    return this.http.get<Response<Match[]>>('/api/hltv/all-matches')
  }

  calculateResult(matchEnd: Response<MatchEnd>): boolean {
    const {isMatchEnd, teamName, winner, moneyBetAmount} = matchEnd.data
    const stats: Stats = this.additionalService.getDataFromLocalStorage('stats') || {wins: 0, loses: 0}

    if (isMatchEnd) {
      if (teamName === winner) {
        const balance = this.balanceService.balance$.getValue()
        this.balanceService.setBalance(balance + moneyBetAmount * 2)

        stats.won += 1
      } else {
        stats.lost += 1
      }
      this.statsService.setStats(stats)
      return true
    }
    return false
  }

  isMatchFinished(bet: Bet): Observable<MatchEnd> {
    return this.http.post<MatchEnd>('/api/hltv/is-match-end', bet)
  }

  checkFinishedMatches$(): Observable<Response<MatchEnd>[]> {
    const actualBets: Observable<MatchEnd>[] = []
    this.bets.forEach((bet: Bet) => actualBets.push(this.isMatchFinished(bet)))
    return zip<Response<MatchEnd>[]>(actualBets as Observable<any>[])
  }
}
