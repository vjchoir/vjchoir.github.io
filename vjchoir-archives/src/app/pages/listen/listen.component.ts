import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ListenService } from './listen.service';
import { SovService } from '../sov/sov.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Playlist } from 'src/app/music/model/Playlist';
import moment from 'moment';
import { Song } from 'src/app/music/model/Song';
import { PlayerService } from 'src/app/music/player/player.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit {

  headerContent;
  sovInfo;
  myPlaylistsInfo: Playlist[];
  currActiveHeader;
  isHeaderVisible: boolean = true;

  constructor(private listenService: ListenService, private sovService: SovService, private playerService: PlayerService, private modalService: NgbModal) { }

  ngOnInit() {
    this.listenService.getHeader().subscribe(content => {
      this.headerContent = content
      this.currActiveHeader = this.headerContent.sections[0];
    });

    this.sovService.getSovInfo().subscribe(content => {
      this.sovInfo = content;
    })

    this.sovInfo.map(item => {
      item.isOpen = false;
      return item;
    });

    this.listenService.getPlaylists().subscribe(myPlaylists => {
      this.myPlaylistsInfo = this.listenService.myPlaylists;
    });
  }

  onKeyEnter(playlist: Playlist, element: any) {
    let property = element.getAttribute("id");

    playlist[property] = element.value;
    this.listenService.savePlaylists(this.myPlaylistsInfo);

    console.log("Updated '" + property + "' to '" + element.value + "'!");
  }

  createNewPlaylist(playlist: Playlist) {
    let tempPlaylist = <Playlist>{
      name: "Default playlist name",
      desc: "Default description name",
      duration: moment.duration("0"),
      tracks: [],
      isOpen: false,
      isDefault: false
    };

    this.myPlaylistsInfo.push(tempPlaylist);
    this.listenService.savePlaylists(this.myPlaylistsInfo);

    console.log("Created new playlist!");

    this.playerService.onPlaylistUpdate({
      type: "Create playlist",
      playlist: tempPlaylist
    });
  }

  deletePlaylist(playlist: Playlist) {
    const playlistIndex = this.myPlaylistsInfo.indexOf(playlist);
    this.myPlaylistsInfo.splice(playlistIndex, 1);
    this.listenService.savePlaylists(this.myPlaylistsInfo);

    console.log("Deleted playlist: " + playlist.name);

    this.playerService.onPlaylistUpdate({
      type: "Delete playlist",
      playlist: playlist
    });
  }

  addSongToPlaylist(song: Song, playlist: Playlist) {
    playlist.tracks.push(song);
    playlist.duration.add(song.duration);

    this.listenService.savePlaylists(this.myPlaylistsInfo);

    this.playerService.onPlaylistUpdate({
      type: "Add song",
      playlist: playlist
    });
  }

  removeSongFromPlaylist(song: Song, playlist: Playlist) {
    playlist.tracks = playlist.tracks.filter(x => x != song);
    playlist.duration.subtract(song.duration);

    this.listenService.savePlaylists(this.myPlaylistsInfo);

    this.playerService.onPlaylistUpdate({
      type: "Remove song",
      playlist: playlist
    });
  }

  playSong(playlist: Playlist, song: Song) {
    this.playerService.onSongRequest(playlist, song);
  }

  resetStorage() {
    this.myPlaylistsInfo = [];
    this.listenService.resetStorage();
  }

  importPlaylist(code: string) {
    this.listenService.decompressPlaylist(code);
    console.log()
  }

  exportPlaylist(playlist: Playlist) {
    let string = this.listenService.compressPlaylist(playlist);
    console.log(string);
  }

  drop(playlist: Playlist, event: CdkDragDrop<string[]>) {
    moveItemInArray(playlist.tracks, event.previousIndex, event.currentIndex);
    this.listenService.savePlaylists(this.myPlaylistsInfo);
  }
}
