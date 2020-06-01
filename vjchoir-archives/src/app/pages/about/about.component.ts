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
    
    this.loadInitialSection();
  }

  private loadInitialSection() {
    let isLinked = false;
    for(let i = 0; i < this.aboutJSON.sections.length; i++) {
      let tempItem = this.aboutJSON.sections[i];
      if(window.location.href.includes(tempItem.id)) {
        this.currActive = tempItem;
        isLinked = true;
        break;
      }
    }

    if(!isLinked) {
      this.currActive = this.aboutJSON.sections[this.aboutJSON.defaultSectionIndex];
      window.location.replace(window.location.href + "#" + this.currActive.id);
    }
  }

}
