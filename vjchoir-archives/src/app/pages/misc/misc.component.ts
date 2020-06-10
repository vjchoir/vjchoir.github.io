import { Component, OnInit } from '@angular/core';
import { MiscService } from './misc.service';
import { UpdateLog } from './model/UpdateLog';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss']
})
export class MiscComponent implements OnInit {

  updateLog: UpdateLog[];
  miscJSON;

  currActive;

  constructor(private miscService: MiscService) { }

  ngOnInit() {
    this.miscService.getUpdateLog().subscribe(updateLog => this.updateLog = updateLog);
    this.miscService.getContent().subscribe(miscJSON => this.miscJSON = miscJSON);

    this.currActive = this.miscJSON.sections[0];
  }

}
