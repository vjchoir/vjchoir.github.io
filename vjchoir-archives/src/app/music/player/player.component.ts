import { Component, OnInit, ViewChild, HostListener, Output, EventEmitter } from "@angular/core";
import { PlyrComponent } from "ngx-plyr";
import { SovService } from "src/app/pages/sov/sov.service";
import { Song } from "../model/Song";
import { NavControllerService } from 'src/app/navigation/nav-controller/nav-controller.service';
import { ListenService } from 'src/app/pages/listen/listen.service';
import { Playlist } from '../model/Playlist';
import { PlayerService } from './player.service';

const PLAYLISTS_DEFAULT_TITLE = "Playlists";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
  @ViewChild(PlyrComponent, { static: false })
  plyr: PlyrComponent;

  @Output() linkClickEmitter = new EventEmitter();

  sovInfo: any;
  myPlaylists: Playlist[];

  playlists: Playlist[] = [];

  isMinimised: boolean;
  isJustLoaded: boolean = true;
  isPlaying: boolean = false;

  activeWindowTitle: string;
  currDisplayedPlaylist: Playlist;
  currActivePlaylist: Playlist;
  
  nowPlaying: Song;

  playerPlaylistsWindow: HTMLElement;

  audioSources: Plyr.Source[] = [];

  constructor(private navController: NavControllerService, private sovService: SovService, private listenService: ListenService, private playerService: PlayerService) {
    this.playerService.playlistUpdates.subscribe(val => {
      if(val.type == "Delete playlist") {
        let tempIndex = this.playlists.indexOf(val.playlist);
        this.playlists.splice(tempIndex, 1);
        console.log("Completed");
        console.log(this.playlists);
      }
      this.loadPlaylists();
    });

    this.playerService.songRequestUpdates.subscribe(val => {
      this.loadSong(val.playlist, val.song);
    })

    this.navController.clickedSong.subscribe(val => {
      const song: Song = val;
      this.loadSongViaId(val.playlistId, val.id);
    });
  }

  ngOnInit() {
    this.loadPlaylists(true);

    this.activeWindowTitle = PLAYLISTS_DEFAULT_TITLE;
    this.isMinimised = true;
    this.playerPlaylistsWindow = document.getElementById("player-playlists");

    this.loadSongViaId(0, 0);
  }

  loadPlaylists(justLoaded?: boolean) {
    this.sovService.getSovInfo().subscribe((info) => {
      this.sovInfo = info

      if(justLoaded) {
        setTimeout(() => this.isJustLoaded = false, 2000);
      }
    });

    this.listenService.getPlaylists().subscribe(playlists => {
      this.myPlaylists = playlists;
    });

    this.playlists = [];
    for(let sov of this.sovInfo) {
      this.playlists.push(sov.repertoire);
    }    
    for(let playlist of this.myPlaylists) {
      this.playlists.push(playlist);
    }
  }

  displayPlaylist(playlist: Playlist) {
    this.currDisplayedPlaylist = playlist;
    this.activeWindowTitle = playlist.name;
    this.playerPlaylistsWindow.scroll(0, 0);
  }

  getDefaultPlaylists(): Playlist[] {
    let defaultPlaylists = this.playlists.filter(x => x.isDefault);
    return defaultPlaylists;
  }

  getMyPlaylists(): Playlist[] {
    let myPlaylists = this.playlists.filter(x => !x.isDefault);
    return this.playlists.filter(x => !x.isDefault);
  }

  onBackClick() {
    this.currDisplayedPlaylist = null;
    this.activeWindowTitle = PLAYLISTS_DEFAULT_TITLE;
    this.playerPlaylistsWindow.scroll(0, 0);
  }

  loadSongViaId(playlistId: number, songId: number) {
    console.log("Loading '" + this.playlists[playlistId].tracks[songId].title + "' of playlist '" + this.playlists[playlistId].name + "'");
    const selected: Song = this.playlists[playlistId].tracks[songId];
    this.audioSources = [
      {
        src: selected.src,
        type: "audio/mp3"
      }
    ]
    this.nowPlaying = selected;
    this.currActivePlaylist = this.playlists[playlistId];
  }

  loadSong(playlist: Playlist, song: Song) {
    this.audioSources = [
      {
        src: song.src,
        type: "audio/mp3",
      },
    ];
    this.nowPlaying = song;
    this.currActivePlaylist = playlist;

    console.log("Loading '" + song.title + "' of playlist '" + playlist.name + "'");
  }

  loadNextSong() {
    let currPlaylistIndex = this.playlists.indexOf(this.currActivePlaylist);
    let currSongIndex = this.currActivePlaylist.tracks.indexOf(this.nowPlaying);
    let nextSongIndex = currSongIndex + 1;

    if(nextSongIndex >= this.currActivePlaylist.tracks.length) {
      nextSongIndex = 0;
    }

    this.loadSongViaId(currPlaylistIndex, nextSongIndex);
  }

  loadPrevSong() {
    let currPlaylistIndex = this.playlists.indexOf(this.currActivePlaylist);
    let currSongIndex = this.currActivePlaylist.tracks.indexOf(this.nowPlaying);
    let prevSongIndex = currSongIndex + 1;

    if(prevSongIndex < this.currActivePlaylist.tracks.length) {
      prevSongIndex = 0;
    }

    this.loadSongViaId(currPlaylistIndex, prevSongIndex);
  }

  onBigPlayClick(event) {
    event.stopPropagation();
    if(this.isPlaying) {
      this.plyr.player.pause();
    } else {
      this.plyr.player.play();
    }
  }

  onBigNextClick(event) {
    event.stopPropagation();
    this.loadNextSong();
  }

  onBigPrevClick(event) {
    event.stopPropagation();
    this.loadPrevSong();
  }

  onCanPlay() {
    if(!this.isJustLoaded) {
      this.plyr.player.play();
    }
  }

  onLinkClick(link: string) {
    this.navController.onLinkClick(link);
  }
}
