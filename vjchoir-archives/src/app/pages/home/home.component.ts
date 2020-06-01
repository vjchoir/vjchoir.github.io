import { Component, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  private homeJSON;

  test: string;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeJSON = this.homeService.getContent();
  }

}
