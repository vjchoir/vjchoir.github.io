import { Component, OnInit, ViewChild, HostListener, Output, EventEmitter } from "@angular/core";
import { PlyrComponent } from "ngx-plyr";
import { SovService } from "src/app/pages/sov/sov.service";
import { Song } from "../model/Song";

const playlistTitle = "Playlists";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
  @ViewChild(PlyrComponent, { static: false })
  plyr: PlyrComponent;

  @Output() linkClick = new EventEmitter();

  sovInfo: any;
  isMinimised: boolean;
  isJustLoaded: boolean = true;
  isPlaying: boolean = false;

  activeWindowTitle: string;
  currDisplayedPlaylist;
  currActivePlaylist;

  nowPlaying: Song;
  

  playerPlaylistsWindow: HTMLElement;

  audioSources: Plyr.Source[] = [];

  @HostListener('plyrCanPlay', ['$event.target'])
  onSeeked() {
    console.log("Ready to play!");
  }

  constructor(private sovService: SovService) {}

  ngOnInit() {
    this.sovService.getSovInfo().subscribe((info) => {
      this.sovInfo = info
      this.loadSongViaId(0, 0);

      setTimeout(() => this.isJustLoaded = false, 2000);
    });

    this.activeWindowTitle = playlistTitle;
    this.isMinimised = false;
    this.playerPlaylistsWindow = document.getElementById("player-playlists");
  }

  displayPlaylist(sov: any) {
    this.currDisplayedPlaylist = sov;
    this.activeWindowTitle = sov.title;
    this.playerPlaylistsWindow.scroll(0, 0);
  }

  onBackClick() {
    this.currDisplayedPlaylist = null;
    this.activeWindowTitle = playlistTitle;
    this.playerPlaylistsWindow.scroll(0, 0);
  }

  loadSongViaId(playlistId: number, songId: number) {
    const selected: Song = this.sovInfo[playlistId].repertoire.tracks[songId];
    this.audioSources = [
      {
        src: selected.src,
        type: "audio/mp3"
      }
    ]
    this.nowPlaying = selected;
    this.currActivePlaylist = this.sovInfo[playlistId];
  }

  loadSong(song: Song) {
    this.audioSources = [
      {
        src: song.src,
        type: "audio/mp3",
      },
    ];
    this.nowPlaying = song;
    this.currActivePlaylist = this.sovInfo[song.playlistId];
  }

  loadNextSong() {
    const playlistId = this.nowPlaying.playlistId;
    let nextSongId = this.nowPlaying.id + 1;

    if(nextSongId >= this.currActivePlaylist.repertoire.tracks.length) {
      nextSongId = 0;
    }

    this.loadSongViaId(playlistId, nextSongId);
  }

  loadPrevSong() {
    const playlistId = this.nowPlaying.playlistId;
    let prevSongId = this.nowPlaying.id - 1;

    if(prevSongId < 0) {
      prevSongId = 0;
    }

    this.loadSongViaId(playlistId, prevSongId);
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

  onLinkClick(sov) {
    this.linkClick.emit(sov);
  }
}
