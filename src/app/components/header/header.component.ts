import {Component, OnInit} from '@angular/core';
import {Stats} from "../../interfaces/interfaces";
import {BetsService} from "../../services/bets.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  stats: Stats;

  constructor(private betsService: BetsService) {
  }

  ngOnInit(): void {
    this.betsService.stats$.subscribe((stats: Stats) => (this.stats = stats))
  }

}
