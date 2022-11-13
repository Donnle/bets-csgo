import {Injectable} from '@angular/core';
import {Bet, Match, Stats, Team} from "../interfaces/interfaces";
import {BehaviorSubject} from "rxjs";
import {AdditionalService} from "./additional.service";

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  bets$: BehaviorSubject<Bet[]> = new BehaviorSubject<Bet[]>([]);

  constructor(private additionalService: AdditionalService) {
    const bets = this.additionalService.getDataFromLocalStorage('bets') || []
    this.bets$.next(bets)
  }

  isBettedOnMatch(match: Match): Bet {
    const bets = this.bets$.value
    for (let bet of bets) {
      if (bet.gameId === match?.id) return bet
    }
    return undefined
  }

  betOnMatch(team: Team, match: Match) {
    const bets = this.bets$.value
    const newBets: Bet[] = [
      ...bets,
      {
        gameUrl: match.HLTVLink,
        gameId: match.id,
        teamName: team.name,
        beginsInTime: match.beginsInTime
      }
    ]
    this.setBets(newBets)
  }

  setBets(bets: Bet[]) {
    this.additionalService.setDataToLocalStorage('bets', bets)
    this.bets$.next(bets)
  }

  cancelBet(betId: number) {
    const bets = this.bets$.value
    let indexOfBet: number;
    for (let index = 0; index < bets.length; index++) {
      if (bets[index].gameId === betId) {
        indexOfBet = index
      }
    }

    if (indexOfBet !== -1) {
      bets.splice(indexOfBet, 1)
    }
    this.setBets(bets)
  }
}
