import {Component, Input, OnInit} from '@angular/core';
import {Bet, Match, Team} from "../../../interfaces/interfaces";
import {BetsService} from "../../../services/bets.service";
import {BalanceService} from "../../../services/balance.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  @Input() match: Match;
  moneyBetAmount: number = 0;
  balance: number;
  betTeam: Bet;

  constructor(public betsService: BetsService, private balanceService: BalanceService) {
  }

  ngOnInit(): void {
    this.betTeam = this.betsService.isBettedOnMatch(this.match)

    this.balanceService.balance$.subscribe((balance) => {
      this.balance = balance
    })
  }

  betOnTeam(team: Team) {
    const isBettedOnMatch = this.betsService.isBettedOnMatch(this.match)

    if (this.balance < this.moneyBetAmount && this.balance + isBettedOnMatch.moneyBetAmount < this.moneyBetAmount) {
      return alert('No money')
    }

    if (this.moneyBetAmount <= 0) {
      return alert('Your bet must be higher than 0')
    }

    this.betTeam = {
      teamName: team.name,
      gameId: this.match.id,
      gameUrl: this.match.HLTVLink,
      beginsInTime: this.match.beginsInTime,
      moneyBetAmount: this.moneyBetAmount
    }
    if (isBettedOnMatch) {
      this.betsService.cancelBet(this.match.id)
    }
    this.betsService.betOnMatch(team, this.match, this.moneyBetAmount)
  }

  cancelBet() {
    this.betTeam = undefined
    this.betsService.cancelBet(this.match.id)
  }
}
