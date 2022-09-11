import {Injectable} from '@angular/core';
import {Bet, Match, Stats, Team} from "../interfaces/interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  bets$: BehaviorSubject<Bet[]> = new BehaviorSubject<Bet[]>([]);
  stats$: BehaviorSubject<Stats> = new BehaviorSubject<Stats>({won: 0, lost: 0})

  constructor() {
    const bets = JSON.parse(localStorage.getItem('bets')) || []
    this.bets$.next(bets)

    const stats = JSON.parse(localStorage.getItem('stats')) || {won: 0, lost: 0}
    this.stats$.next(stats)
  }

  isBetOnThisGame(match: Match): Bet {
    for (let bet of this.bets$.value) {
      if (bet.gameId === match?.id) return bet
    }
    return undefined
  }

  betOnGame(team: Team, match: Match) {
    const newBets = [...this.bets$.value, {gameUrl: match.HLTVLink, gameId: match.id, teamName: team.name}]
    localStorage.setItem('bets', JSON.stringify(newBets))
    this.bets$.next(newBets)
  }

}
