import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() menu;
  @Input() controller;
  @Input() currActive;
  
  private navTitle: string;
  
  constructor() { }

  ngOnInit() {
    this.navTitle = this.currActive.name;
  }

}
