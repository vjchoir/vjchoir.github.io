import { Injectable } from '@angular/core';

import listenJSON from '../../../assets/data/listen.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListenService {

  constructor() { }

  getHeader(): Observable<any> {
      return of(listenJSON.header)
  }
}