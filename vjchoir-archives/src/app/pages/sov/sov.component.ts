import { Component, OnInit, HostListener } from '@angular/core';
import { SovService } from './sov.service';
import { SymphVoices } from 'src/app/music/model/SymphVoices';
import { Router, NavigationStart } from '@angular/router';

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

  constructor(private sovService: SovService, private router: Router) { 
    router.events.subscribe(val => {
        if(val instanceof NavigationStart) {
          if(val.url.includes('sov#')) {
            let searchTerm = val.url.split('#')[1];
            let temp = this.sovInfo.filter(x => {
              return x.abbr.includes(val.url.split('#')[1]);
            });

            this.currActive = temp[0];  
          }
        }
    });
  }

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
