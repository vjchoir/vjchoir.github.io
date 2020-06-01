import { Component, OnInit } from '@angular/core';

import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutJSON: any;
  currActive;

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.aboutService.getContent()
      .subscribe(about => this.aboutJSON = about);
    
    this.currActive = this.aboutJSON.sections[this.aboutJSON.defaultSectionIndex];
  }

}
