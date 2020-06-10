import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';
import { Title } from '@angular/platform-browser';
import { LoadingService } from 'src/app/loading/loading.service';

const ARCHIVE_NAME = "The VJChoir Archives"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  homeJSON;

  test: string;

  constructor(private homeService: HomeService, 
    private titleService: Title,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.homeService.getContent()
      .subscribe(home => this.homeJSON = home);
    
    this.titleService.setTitle(ARCHIVE_NAME);
    
    this.loadingService.setLoading(false);
  }

}
