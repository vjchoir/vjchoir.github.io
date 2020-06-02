import { Component, OnInit, HostListener } from '@angular/core';
import { SovService } from './sov.service';
import { SymphVoices } from 'src/app/music/model/SymphVoices';

@Component({
  selector: 'app-sov',
  templateUrl: './sov.component.html',
  styleUrls: ['./sov.component.scss']
})
export class SovComponent implements OnInit {

  sovIntro;
  sovInfo: SymphVoices[];

  currActive: SymphVoices;
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.loadInitialSection();
  }

  constructor(private sovService: SovService) { }

  ngOnInit() {
    this.sovService.getSovIntro().subscribe(intro => this.sovIntro = intro);
    this.sovService.getSovInfo().subscribe(info => this.sovInfo = info);

    this.loadInitialSection();
    console.log(this.sovInfo);
  }

  private loadInitialSection() {
    this.currActive = null;
    let isLinked = false;

      for(let i = 0; i < this.sovInfo.length; i++) {
        let tempItem = this.sovInfo[i];
        if(window.location.href.includes(tempItem.abbr)) {
          this.currActive = tempItem;
          isLinked = true;
          break;
        }
      }
  }
}
