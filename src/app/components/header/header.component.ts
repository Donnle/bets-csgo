import {Component, OnInit} from '@angular/core';
import {Stats} from "../../interfaces/interfaces";
import {StatsService} from "../../services/stats.service";
import {BalanceService} from "../../services/balance.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  stats: Stats;
  balance: number;

  constructor(private statsService: StatsService, private balanceService: BalanceService) {
  }

  ngOnInit(): void {
    this.statsService.stats$.subscribe((stats: Stats) => {
      this.stats = stats
    })

    this.balanceService.balance$.subscribe((balance) => {
      this.balance = balance
    })
  }

}
