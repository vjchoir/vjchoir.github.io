import { Component, Input, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing/app-routing.module';

import { SidebarItem } from "./model/SidebarItem";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarItems;
  @Input() controller;
  @Input() currActive;

  sidebarActiveItem: SidebarItem;

  constructor() { }

  ngOnInit() {
    this.currActive.active = true;
    this.sidebarActiveItem = this.currActive;
  }

  setActive() {
    this.sidebarActiveItem.active = false;
    this.sidebarActiveItem = this.currActive;
    this.currActive.active = true;   
  }
}
