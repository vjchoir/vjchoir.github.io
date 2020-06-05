import { Injectable, ViewChild } from "@angular/core";

import menuJSON from "../../../assets/data/menu.json";
import { MenuItem } from "../model/MenuItem";
import { Observable, of, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NavControllerService {
  
  private menuItems: MenuItem[];

  private clickedSongSource = new Subject<any>();
  clickedSong = this.clickedSongSource.asObservable();

  private clickedLinkSource = new Subject<any>();
  clickedLink = this.clickedLinkSource.asObservable();

  constructor() {}

  getMenuItems(): Observable<MenuItem[]> {
    if(!this.menuItems) {
        this.menuItems = menuJSON.items.map((x) => this.toMenuItem(x));
    } 

    return of(this.menuItems);
  }

  getDefaultActiveItem() {
    return this.menuItems[menuJSON.defaultActiveId];
  }

  private toMenuItem(x) {
    return {
      id: x.id,
      name: x.name,
      linkName: x.linkName,
      icon: x.icon,
      active: x.active,
      isVisible: x.isVisible,
    };
  }

  onSongClick(event: any) {
    this.clickedSongSource.next(event);
  }

  onLinkClick(event: any) {
    this.clickedLinkSource.next(event);
  }
}
