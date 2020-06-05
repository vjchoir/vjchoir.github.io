import { Component, OnInit, HostListener } from '@angular/core';
import { BatchesService } from './batches.service';
import { BatchItem } from './model/BatchItem';
import { NavControllerService } from 'src/app/navigation/nav-controller/nav-controller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {

  batches: BatchItem[];
  batchesIntro: any;
  currActive: BatchItem;

  constructor(private navControllerService: NavControllerService, private batchesService: BatchesService, private router: Router) { 
  
  }

  ngOnInit() {
    this.batchesService.getIntro().subscribe(intro => this.batchesIntro = intro);
    this.batchesService.getBatches().subscribe(batches => {
      this.batches = batches
      this.handleFragment();
    });
    
    this.navControllerService.routerUpdates.subscribe(val => {
      this.handleFragment();
    });
  }

  private handleFragment() {
    if (!this.router.url.includes("#")) {
      this.currActive = null;
    } else {
      let fragment = this.router.url.split("#")[1];
      for (let item of this.batches) {
        if (fragment.includes(item.id)) {
          this.currActive = item;
          return;
        }
      }

      this.currActive = null;
    }
  }
}
