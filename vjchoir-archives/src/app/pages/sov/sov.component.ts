import { Component, OnInit } from '@angular/core';
import { SovService } from './sov.service';
import { SymphVoices } from 'src/app/music/model/SymphVoices';

@Component({
  selector: 'app-sov',
  templateUrl: './sov.component.html',
  styleUrls: ['./sov.component.scss']
})
export class SovComponent implements OnInit {

  sovIntro;
  sovInfo: SymphVoices[];

  currActive: SymphVoices;

  constructor(private sovService: SovService) { }

  ngOnInit() {
    this.sovService.getSovIntro().subscribe(intro => this.sovIntro = intro);
    this.sovService.getSovInfo().subscribe(info => this.sovInfo = info);

    console.log(this.sovInfo);
  }

}
