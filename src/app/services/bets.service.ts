import {Injectable} from '@angular/core';
import {Bet, Match, Team} from "../interfaces/interfaces";
import {BehaviorSubject} from "rxjs";
import {AdditionalService} from "./additional.service";
import {BalanceService} from "./balance.service";

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  bets$: BehaviorSubject<Bet[]> = new BehaviorSubject<Bet[]>([]);

  constructor(private additionalService: AdditionalService, private balanceService: BalanceService) {
    const bets = this.additionalService.getDataFromLocalStorage('bets') as Bet[] || []
    this.bets$.next(bets)
  }

  betOnMatch(team: Team, match: Match, moneyBetAmount: number) {
    const bets = this.bets$.getValue()
    const balance: number = this.balanceService.balance$.getValue()

    const newBets: Bet[] = [
      ...bets,
      {
        gameUrl: match.HLTVLink,
        gameId: match.id,
        teamName: team.name,
        beginsInTime: match.beginsInTime,
        moneyBetAmount
      }
    ]

    this.balanceService.setBalance(balance - moneyBetAmount)
    this.setBets(newBets)
  }

  cancelBet(betId: number) {
    const bets: Bet[] = this.bets$.getValue()
    const balance: number = this.balanceService.balance$.getValue()
    let indexOfBet: number;

    for (let index = 0; index < bets.length; index++) {
      if (bets[index].gameId === betId) {
        indexOfBet = index
      }
    }

    this.balanceService.setBalance(balance + bets[indexOfBet].moneyBetAmount)

    if (indexOfBet !== -1) {
      bets.splice(indexOfBet, 1)
    }
    this.setBets(bets)
  }

  isBettedOnMatch(match: Match): Bet {
    const bets = this.bets$.getValue()
    for (let bet of bets) {
      if (bet.gameId === match?.id) return bet
    }
    return undefined
  }

  setBets(bets: Bet[]) {
    this.additionalService.setDataToLocalStorage('bets', bets)
    this.bets$.next(bets)
  }
}
