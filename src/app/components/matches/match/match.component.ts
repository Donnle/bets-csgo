import {Component, Input, OnInit} from '@angular/core';
import {Bet, Match} from "../../../interfaces/interfaces";
import {BetsService} from "../../../services/bets.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  @Input() match: Match;
  betTeam: Bet;

  constructor(public betsService: BetsService) {
  }

  ngOnInit(): void {
    this.betTeam = this.betsService.isBetOnThisGame(this.match)
  }
}
