import { Component, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import homeJSON from '../../../assets/data/home.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  private homeJSON;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  test: string;

  constructor() { }

  ngOnInit() {
    this.homeJSON = homeJSON;
  }

}
