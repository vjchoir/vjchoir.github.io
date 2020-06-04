import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { SovService } from './sov.service';
import { SymphVoices } from 'src/app/music/model/SymphVoices';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NavControllerService } from 'src/app/navigation/nav-controller/nav-controller.service';

@Component({
  selector: 'app-sov',
  templateUrl: './sov.component.html',
  styleUrls: ['./sov.component.scss']
})
export class SovComponent implements OnInit {

  sovIntro;
  sovInfo: SymphVoices[];

  currActive: SymphVoices;

  constructor(private navController: NavControllerService, private sovService: SovService, private router: Router) { 
    
  }

  ngOnInit() {
    this.sovService.getSovIntro().subscribe(intro => this.sovIntro = intro);
    this.sovService.getSovInfo().subscribe(info => this.sovInfo = info);

    this.loadInitialSection();
  }

  ngAfterViewInit() {
    this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd && val.url.includes('sov#')) {
        const fragmentCode = val.url.split('#')[1];
        this.navigateToFragment(fragmentCode);
      }
    })
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

  navigateToFragment(fragmentCode) {
    let temp = this.sovInfo.filter(x => {
      return x.abbr.includes(fragmentCode);
    });

    this.currActive = temp[0];
    window.scroll(0, 0);
  }
}
