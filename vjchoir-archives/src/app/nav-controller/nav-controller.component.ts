import { Component, OnInit } from '@angular/core';
import menuJSON from '../../assets/data/menu.json';
import { SidebarItem } from '../sidebar/model/SidebarItem';

@Component({
  selector: 'nav-controller',
  templateUrl: './nav-controller.component.html',
  styleUrls: ['./nav-controller.component.scss']
})
export class NavControllerComponent implements OnInit {

  private menu = menuJSON;
  private controller : NavControllerComponent;
  private currActive : SidebarItem;

  constructor() { }

  ngOnInit() {
    this.menu = menuJSON;
    this.controller = this;
    this.currActive = this.menu.items[this.menu.defaultActiveId];
  }

  navigateTo(item) {
    this.currActive = item;
  }
}
