import { Component, OnInit } from '@angular/core';

import aboutJSON from '../../../assets/data/about.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutJSON: any;
  currActive;

  constructor() { }

  ngOnInit() {
    this.aboutJSON = aboutJSON;
    
    this.currActive = this.aboutJSON.sections[this.aboutJSON.defaultSectionIndex];
  }

}
