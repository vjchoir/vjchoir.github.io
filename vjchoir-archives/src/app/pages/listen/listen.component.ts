import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ListenService } from './listen.service';
import { SovService } from '../sov/sov.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Playlist } from 'src/app/music/model/Playlist';
import moment from 'moment';
import { Song } from 'src/app/music/model/Song';

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

  constructor(private listenService: ListenService, private sovService: SovService, private modalService: NgbModal) { }

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
      id: -1,
      name: "Default playlist name",
      desc: "Default description name",
      duration: moment.duration("0"),
      tracks: [],
      isOpen: false,
    };

    this.myPlaylistsInfo.push(tempPlaylist);
    this.listenService.savePlaylists(this.myPlaylistsInfo);

    console.log("Created new playlist!");
  }

  deletePlaylist(playlist: Playlist) {
    this.myPlaylistsInfo = this.myPlaylistsInfo.filter(x => x != playlist);
    console.log("Deleted playlist: " + playlist.name);
    this.listenService.savePlaylists(this.myPlaylistsInfo);
  }

  addSongToPlaylist(song: Song, playlist: Playlist) {
    playlist.tracks.push(song);
    playlist.duration.add(song.duration);

    this.listenService.savePlaylists(this.myPlaylistsInfo);
  }

  removeSongFromPlaylist(song: Song, playlist: Playlist) {
    playlist.tracks = playlist.tracks.filter(x => x != song);
    playlist.duration.subtract(song.duration);

    this.listenService.savePlaylists(this.myPlaylistsInfo);
  }
}
