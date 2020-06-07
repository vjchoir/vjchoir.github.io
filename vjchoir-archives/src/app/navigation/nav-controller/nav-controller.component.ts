import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ViewChildren,
  QueryList,
} from "@angular/core";
import { MenuItem } from "../model/MenuItem";

import { NavControllerService } from "./nav-controller.service";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { HomeComponent } from "src/app/pages/home/home.component";
import { AboutComponent } from "src/app/pages/about/about.component";
import { BatchesComponent } from "src/app/pages/batches/batches.component";
import { SovComponent } from "src/app/pages/sov/sov.component";
import { PlayerComponent } from "src/app/music/player/player.component";

@Component({
  selector: "nav-controller",
  templateUrl: "./nav-controller.component.html",
  styleUrls: ["./nav-controller.component.scss"],
})
export class NavControllerComponent implements OnInit {
  @ViewChild(HomeComponent)
  homeComponent: HomeComponent;

  @ViewChild(AboutComponent)
  aboutComponent: AboutComponent;

  @ViewChild(BatchesComponent)
  batchesComponent: BatchesComponent;

  @ViewChildren("sovComponents")
  public sovComponents: QueryList<SovComponent>;
  private sovComponent;

  menu: MenuItem[];
  controller: NavControllerComponent;
  currActive: MenuItem;

  constructor(
    private navControllerService: NavControllerService,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(val);
        this.navControllerService.onRouteUpdate(val);
      }
    });
    this.navControllerService.clickedLink.subscribe((val) => {
      this.navigateToLink(val);
    });
  }

  ngOnInit() {
    this.getMenu();
    this.setCurrActive();
    this.controller = this;
  }

  ngAfterViewInit(): void {
    this.sovComponents.changes.subscribe((sovs: QueryList<SovComponent>) => {
      this.sovComponent = sovs.first;
    });
  }

  private getMenu() {
    this.navControllerService
      .getMenuItems()
      .subscribe((menu) => (this.menu = menu));
  }

  private setCurrActive() {
    const windowName = window.location.href;

    for (let i = 0; i < this.menu.length; i++) {
      let item = this.menu[i];

      if (windowName.includes(item.linkName)) {
        this.currActive = item;
        break;
      }
    }

    if (!this.currActive) {
      this.currActive = this.navControllerService.getDefaultActiveItem();
    }
  }

  navigateTo(item) {
    this.currActive = item;

    window.scroll(0, 0);
  }

  navigateToLink(url: string) {
    if (url.toLowerCase().includes("sov")) {
      let temp = this.menu.filter((x) => x.linkName.includes("sov"));
      this.navigateTo(temp[0]);
    } else if (url.toLowerCase().includes("listen")) {
      let temp = this.menu.filter((x) => x.linkName.includes("listen"));
      this.navigateTo(temp[0]);
    }
  }
}
