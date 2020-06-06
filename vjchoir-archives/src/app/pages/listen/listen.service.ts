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

    if (!json || json == "") {
      this.myPlaylists = [];
    } else {
      this.myPlaylists = JSON.parse(json);
      this.myPlaylists.map(playlistJSON => {
        return this.jsonToPlaylist(playlistJSON);
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
    console.log(myPlaylists.length);
    let json = JSON.stringify(myPlaylists);
    console.log("Saving playlists json...");
    localStorage.setItem(MY_PLAYLISTS_STRING, json);
  }

  resetStorage() {
    localStorage.setItem(MY_PLAYLISTS_STRING, "");
    console.log("Storage has been reset!");
    console.log(localStorage.getItem(MY_PLAYLISTS_STRING));

    this.myPlaylists = [];
  }

  jsonToPlaylist(playlist: any): Playlist {
    playlist.duration = moment.duration(playlist.duration);
    for(let song of playlist.tracks) {
        song.duration = moment.duration(song.duration);
    }
    playlist.isOpen = false;

    return playlist;
  }

  decompressPlaylist(code: string) {
  
  }

  compressPlaylist(playlist: Playlist) {

  }
}
