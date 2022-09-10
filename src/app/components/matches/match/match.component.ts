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
    this.betTeam = this.betsService.isBetOnThisGame(this.match)
  }

  betOnTeam(team: Team) {
    if (this.betsService.isBetOnThisGame(this.match)) {
      console.log('Already bet on this game')
      return
    }
    this.betTeam = {teamName: team.name, gameId: this.match.id, gameUrl: this.match.HLTVLink}
    this.betsService.betOnGame(team, this.match)
  }
}
