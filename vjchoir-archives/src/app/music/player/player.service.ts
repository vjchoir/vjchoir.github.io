import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

    private playlistUpdatesSource = new Subject<any>();
    playlistUpdates = this.playlistUpdatesSource.asObservable();

    constructor() { }

    onPlaylistUpdate(msg: any) {
        console.log(msg);
        this.playlistUpdatesSource.next(msg);
    }
}