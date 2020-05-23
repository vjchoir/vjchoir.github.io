import { Component, OnInit } from '@angular/core';
import homeJSON from '../../../assets/data/home.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private homeJSON;

  constructor() { }

  ngOnInit() {
    this.homeJSON = homeJSON;
  }

}
