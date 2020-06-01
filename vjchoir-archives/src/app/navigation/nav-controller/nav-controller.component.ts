import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../model/MenuItem';

import { NavControllerService } from './nav-controller.service';
import { Router } from '@angular/router'

@Component({
  selector: 'nav-controller',
  templateUrl: './nav-controller.component.html',
  styleUrls: ['./nav-controller.component.scss']
})
export class NavControllerComponent implements OnInit {

  private menu: MenuItem[];
  private controller: NavControllerComponent;
  private currActive: MenuItem;

  constructor(private navControllerService: NavControllerService,
              private router: Router) { }

  ngOnInit() {
    this.getMenu();
    this.setCurrActive();
    this.controller = this;
  }

  private getMenu() {
    this.navControllerService.getMenuItems()
      .subscribe(menu => this.menu = menu);
  }

  private setCurrActive() {
    const windowName = window.location.href;
    
    for(let i = 0; i < this.menu.length; i++) {
      let item = this.menu[i];
      
      if(windowName.includes(item.linkName)) {
        this.currActive = item;
        break;
      }
    }

    if(!this.currActive) {
      this.currActive = this.navControllerService.getDefaultActiveItem();
    }
  }

  navigateTo(item) {
    this.currActive = item;
  }
}
