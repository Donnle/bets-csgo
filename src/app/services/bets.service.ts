import {Injectable} from '@angular/core';
import {Bet, Match, Team} from "../interfaces/interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  bets$: BehaviorSubject<Bet[]> = new BehaviorSubject<Bet[]>([]);

  constructor() {
    const bets = JSON.parse(localStorage.getItem('bets')) || []
    this.bets$.next(bets)
  }


  isBetOnThisGame(match: Match): Bet {
    for (let bet of this.bets$.value) {
      if (bet.gameId === match?.id) return bet
    }
    return undefined
  }

  betOnGame(team: Team, match: Match) {
    if (this.isBetOnThisGame(match)) {
      console.log('Already bet on this game')
      return
    }
    const newBets = [...this.bets$.value, {gameUrl: match.HLTVLink, gameId: match.id, teamName: team.name}]
    localStorage.setItem('bets', JSON.stringify(newBets))
    this.bets$.next(newBets)
  }

}
