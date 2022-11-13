import {Component, OnInit} from '@angular/core';
import {Stats} from "../../interfaces/interfaces";
import {StatsService} from "../../services/stats.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  stats: Stats;

  constructor(private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.statsService.stats$.subscribe((stats: Stats) => (this.stats = stats))
  }

}
