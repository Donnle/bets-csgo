import {Injectable} from '@angular/core';
import {AdditionalService} from "./additional.service";
import {BehaviorSubject} from "rxjs";
import {Stats} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  stats$: BehaviorSubject<Stats> = new BehaviorSubject<Stats>({won: 0, lost: 0})

  constructor(private additionalService: AdditionalService) {
    const stats = this.additionalService.getDataFromLocalStorage('stats') || {won: 0, lost: 0}
    this.stats$.next(stats)
  }

  setStats(stats: Stats) {
    this.additionalService.setDataToLocalStorage('stats', stats)
    this.stats$.next(stats)
  }
}
