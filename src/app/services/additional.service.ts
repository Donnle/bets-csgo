import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdditionalService {

  constructor() {
  }

  setDataToLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  getDataFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }
}
