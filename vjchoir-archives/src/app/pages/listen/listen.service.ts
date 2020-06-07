import { Injectable } from "@angular/core";

import listenJSON from "../../../assets/data/listen.json";

import { Observable, of } from "rxjs";
import { Playlist } from "src/app/music/model/Playlist";
import moment from "moment";
import { SovService } from '../sov/sov.service';

const MY_PLAYLISTS_STRING = "myPlaylists";

const DEFAULT_TITLE = "Imported playlist";
const DEFAULT_DESCRIPTION = "This playlist was imported!"

const PLAYLIST_SEPARATOR = "p";
const TRACKS_SEPARATOR = "t";
const SONG_SEPARATOR = "s";
const POS_SEPARATOR = "i";

@Injectable({
  providedIn: "root",
})
export class ListenService {
  myPlaylists: Playlist[];
  sovInfo: any;

  constructor(private sovService: SovService) {
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

    this.sovService.getSovInfo().subscribe(info => this.sovInfo = info);
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

  parametersToPlaylist(code: string): any {
    try {
      let params = [];
      let playlistParams = code.split(PLAYLIST_SEPARATOR);
      playlistParams.shift();
      for(let playlistParam of playlistParams) {
        let plIdAndTracks = playlistParam.split(TRACKS_SEPARATOR);
        let plId = plIdAndTracks[0];
        let tracks = plIdAndTracks[1].split(SONG_SEPARATOR);
        tracks.shift();

        for(let track of tracks) {
          let trackInfo = track.split(POS_SEPARATOR);
          let trackId = trackInfo[0];
          let pos = trackInfo[1];

          params.push({
            pl_id: plId,
            id: trackId,
            pos: pos
          })
        }
      }

      let songs = params.map(param => {
        let sov = this.sovInfo.filter(x => x.id == parseInt(param.pl_id))[0];
        let song = sov.repertoire.tracks[parseInt(param.id)];

        return {
          pos: param.pos,
          song: song
        }
      });

      let playlist: Playlist = {
        name: DEFAULT_TITLE,
        desc: DEFAULT_DESCRIPTION,
        tracks: songs.sort((a, b) => a.pos - b.pos).map(x => x.song)
      }

      let repertoireDuration = moment.duration();
      for(let j = 0; j < playlist.tracks.length; j ++) {
        repertoireDuration.add(playlist.tracks[j].duration);
      }

      playlist.duration = repertoireDuration;
      
      return playlist;
    } catch(e) {
      console.log(e);
    }
  }

  playlistToParameters(playlist: Playlist): any {
    const tracks = playlist.tracks;
    let plIds = [];
    let params = [];

    let output = '';

    for(let i = 0; i < tracks.length; i ++) {
      let song = tracks[i];
      let param = {
        pl_pos: i.toString(),
        id: song.id.toString(),
        pl_id: song.album_info.id,
      }

      if(param.pl_pos.length != 2) {
        param.pl_pos = '0' + param.pl_pos;
      }

      if(param.id.length != 2) {
        param.id = '0' + param.id;
      }

      params.push(param);

      if(!plIds.includes(param.pl_id)) {
        plIds.push(param.pl_id);
      }
    }

    for(let plId of plIds) {
      let str: string = ''
      str +=(PLAYLIST_SEPARATOR + plId + TRACKS_SEPARATOR);

      let songsWithThisId = params.filter(x => x.pl_id == plId);

      for(let song of songsWithThisId) {
        str += SONG_SEPARATOR + song.id + POS_SEPARATOR + song.pl_pos;
      }

      output += str;
    }

    return output;
  }
}
