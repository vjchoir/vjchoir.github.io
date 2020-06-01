import { Injectable } from "@angular/core";

import menuJSON from "../../../assets/data/menu.json";
import { MenuItem } from "../model/MenuItem";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NavControllerService {
  private menuItems: MenuItem[];

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
}
