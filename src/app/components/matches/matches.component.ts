import {Component, OnInit} from '@angular/core';
import {AllMatchesResponse, Match, Response} from "../../interfaces/interfaces";
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
      .get<Response<AllMatchesResponse>>('/api/all-matches')
      .subscribe((response: Response<AllMatchesResponse>) => {
        this.matches = response.data.matches
      })
  }
}
