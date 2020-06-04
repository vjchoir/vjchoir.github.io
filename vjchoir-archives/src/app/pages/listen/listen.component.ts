import { Component, OnInit } from '@angular/core';
import { ListenService } from './listen.service';
import { SovService } from '../sov/sov.service';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit {

  headerContent;
  sovInfo;
  currActiveHeader;

  constructor(private listenService: ListenService, private sovService: SovService) { }

  ngOnInit() {
    this.listenService.getHeader().subscribe(content => {
      this.headerContent = content
      this.currActiveHeader = this.headerContent.sections[0];
    });

    this.sovService.getSovInfo().subscribe(content => {
      this.sovInfo = content;
    })

    this.sovInfo.map(item => {
      item.isOpen = false;
      return item;
    })

    console.log(this.sovInfo);
  }

}
