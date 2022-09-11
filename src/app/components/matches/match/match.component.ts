import {Component, Input, OnInit} from '@angular/core';
import {Bet, Match, Team} from "../../../interfaces/interfaces";
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
    this.betTeam = this.betsService.isBettedOnMatch(this.match)
  }

  betOnTeam(team: Team) {
    this.betTeam = {teamName: team.name, gameId: this.match.id, gameUrl: this.match.HLTVLink}
    if (this.betsService.isBettedOnMatch(this.match)) {
      this.betsService.cancelBet(this.match.id)
    }
    this.betsService.betOnMatch(team, this.match)
  }
}
