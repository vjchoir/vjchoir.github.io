import { Component, OnInit, ViewChild } from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';
import { SovService } from 'src/app/pages/sov/sov.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @ViewChild(PlyrComponent, {static: false})
  plyr: PlyrComponent;

  sovInfo: any;
  isMinimised: boolean;

  audioSources: Plyr.Source[] = [
    {
      src: "../assets/audio/SOV2019/1 Beati Quorum Via.mp3",
      type: "audio/mp3"
    }
  ]

  constructor(private sovService: SovService) { }

  ngOnInit() {
    this.isMinimised = true;
    this.sovService.getSovInfo().subscribe(info => this.sovInfo = info);
  }

}
