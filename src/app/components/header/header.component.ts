import {Component, OnInit} from '@angular/core';
import {Stats} from "../../interfaces/interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  stats: Stats = JSON.parse(localStorage.getItem('stats')) || {wins: 0, loses: 0};

  constructor() {
  }

  ngOnInit(): void {

  }

}
