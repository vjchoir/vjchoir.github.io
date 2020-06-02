import { Component, OnInit } from '@angular/core';

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
    this.homeService.getContent()
      .subscribe(home => this.homeJSON = home);
  }

}
