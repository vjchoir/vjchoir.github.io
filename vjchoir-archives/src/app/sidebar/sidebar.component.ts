import { Component, OnInit } from '@angular/core';
import { SidebarItem } from './model/SidebarItem';

import sidebarJSON from '../../assets/data/sidebar.json';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private defaultActive = 0;
  private currActive;
  sidebarItems: SidebarItem[];

  constructor() { }

  ngOnInit() {
    this.sidebarItems = sidebarJSON.sidebarItems;

    this.sidebarItems[this.defaultActive].active = true;
  }

  private setActive(sidebarItem) {
    this.currActive.active = false;
    this.currActive = sidebarItem;
    this.currActive.active = true;
  }
}
