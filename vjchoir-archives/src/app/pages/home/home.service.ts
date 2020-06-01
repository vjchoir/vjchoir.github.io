import { Injectable } from '@angular/core';

import homeJSON from '../../../assets/data/home.json';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  constructor() { }

  getContent() {
      return homeJSON;
  }
}