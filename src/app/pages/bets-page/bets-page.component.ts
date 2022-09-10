import {Component, OnInit} from '@angular/core';
import {Match} from "../../interfaces/interfaces";
import {HttpClient} from "@angular/common/http";
import {MatchesService} from "../../services/matches.service";

@Component({
  selector: 'app-bets-page',
  templateUrl: './bets-page.component.html',
  styleUrls: ['./bets-page.component.scss']
})
export class BetsPageComponent implements OnInit {
  matches: Match[] = []
  title = 'bets-csgo';

  constructor(private http: HttpClient, private matchesService: MatchesService) {
  }

  ngOnInit() {
    this.matchesService.matches$.subscribe((matches: Match[]) => {
      this.matches = matches
    })
  }
}
