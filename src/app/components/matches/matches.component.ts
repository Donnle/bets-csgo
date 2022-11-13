import {Component, OnInit} from '@angular/core';
import {Match, Response} from "../../interfaces/interfaces";
import {HttpClient} from "@angular/common/http";
import {MatchesService} from "../../services/matches.service";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  matches: Match[] = []

  constructor(private http: HttpClient, private matchesService: MatchesService) {
  }

  ngOnInit() {
    this.matchesService.getAllMatches().subscribe((response) => {
      this.matches = response.data
    })
  }
}
