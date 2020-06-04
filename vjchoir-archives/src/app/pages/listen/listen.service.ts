import { Injectable, ChangeDetectorRef } from "@angular/core";

import listenJSON from "../../../assets/data/listen.json";
import { Observable, of } from "rxjs";
import { Playlist } from "src/app/music/model/Playlist";
import moment from "moment";

const MY_PLAYLISTS_STRING = "myPlaylists";

@Injectable({
  providedIn: "root",
})
export class ListenService {
  myPlaylists: Playlist[];
  constructor() {
    let json = localStorage.getItem(MY_PLAYLISTS_STRING);
    console.log("Loading playlists json...");
    console.log(json);

    if (!json || json == "") {
      this.myPlaylists = [];
    } else {
      this.myPlaylists = JSON.parse(json);
      this.myPlaylists.map((playlist) => {
        playlist.duration = moment.duration(playlist.duration);
        playlist.isOpen = false;
        return playlist;
      });
    }
  }

  getHeader(): Observable<any> {
    return of(listenJSON.header);
  }

  getPlaylists(): Observable<Playlist[]> {
    return of(this.myPlaylists);
  }

  savePlaylists(myPlaylists: Playlist[]) {
    let json = JSON.stringify(myPlaylists);
    console.log("Saving playlists json...");
    localStorage.setItem(MY_PLAYLISTS_STRING, json);
  }

  resetStorage() {
    localStorage.setItem(MY_PLAYLISTS_STRING, "");
    console.log("Storage has been reset");
    console.log(localStorage.getItem(MY_PLAYLISTS_STRING));

    this.myPlaylists = [];
  }
}
