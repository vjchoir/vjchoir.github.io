import { Component, OnInit } from '@angular/core';
import { BatchesService } from './batches.service';
import { BatchItem } from './model/BatchItem';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {

  batches: BatchItem;
  batchesIntro: any;
  currActive: BatchItem;

  constructor(private batchesService: BatchesService) { }

  ngOnInit() {
    this.batchesService.getBatches().subscribe(batches => this.batches = batches);
    this.batchesService.getIntro().subscribe(intro => this.batchesIntro = intro);
  }

}
