import { Component, OnInit, HostListener } from '@angular/core';
import { BatchesService } from './batches.service';
import { BatchItem } from './model/BatchItem';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {

  batches: BatchItem[];
  batchesIntro: any;
  currActive: BatchItem;

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.loadInitialSection();
  }

  constructor(private batchesService: BatchesService) { }

  ngOnInit() {
    this.batchesService.getBatches().subscribe(batches => this.batches = batches);
    this.batchesService.getIntro().subscribe(intro => this.batchesIntro = intro);

    this.loadInitialSection();
  }

  private loadInitialSection() {
    this.currActive = null;
    let isLinked = false;

      for(let i = 0; i < this.batches.length; i++) {
        let tempItem = this.batches[i];
        if(window.location.href.includes(tempItem.id)) {
          this.currActive = tempItem;
          isLinked = true;
          break;
        }
      }
  }

}
