import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AdditionalService} from "./additional.service";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  balance$: BehaviorSubject<number> = new BehaviorSubject<number>(1000)

  constructor(private additionalService: AdditionalService) {
    const balance = this.additionalService.getDataFromLocalStorage('balance')
    this.balance$.next(balance === 0 ? 0 : balance)
  }

  setBalance(balance: number) {
    this.additionalService.setDataToLocalStorage('balance', balance)
    this.balance$.next(balance)
  }
}
