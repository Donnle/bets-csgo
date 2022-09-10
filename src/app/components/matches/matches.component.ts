import {Component, OnInit} from '@angular/core';
import {Match, Response} from "../../interfaces/interfaces";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  matches: Match[] = []

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http
      .get<Response<Match[]>>('/api/all-matches')
      .subscribe((response: Response<Match[]>) => {
        this.matches = response.data
      })
  }
}
