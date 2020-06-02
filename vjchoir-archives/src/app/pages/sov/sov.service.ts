import { Injectable } from '@angular/core';

import sovJSON from '../../../assets/data/sov.json';
import { Observable, of } from 'rxjs';
import { SymphVoices } from 'src/app/music/model/SymphVoices';
import { Playlist } from 'src/app/music/model/Playlist';
import { Song } from 'src/app/music/model/Song';

@Injectable({
  providedIn: 'root',
})
export class SovService {

    sovInfo: SymphVoices[];

  constructor() { }

  getContent(): Observable<any> {
    if(this.sovInfo) {
        return of(this.sovInfo);
    }

    this.sovInfo = Array<SymphVoices>();
    
    for(let i = 0; i < sovJSON.length; i ++) {
        let jsonItem = sovJSON[i];

        let tempTracks: Song[] = Array<Song>();
        
        for(let j = 0; j < jsonItem.repertoire.length; j ++) {
            const tempJSON = jsonItem.repertoire[j];
            let tempSong: Song = <Song> {
                id: j,
                title: tempJSON.name,
                composer: tempJSON.composer,
                duration: tempJSON.duration,
                link: tempJSON.mp3
            }
            
            tempTracks.push(tempSong);
        }

        let tempRepertoire: Playlist = <Playlist> {
            id: i,
            tracks: tempTracks
        };

        let tempSOV = <SymphVoices> {
            id: i,
            title: jsonItem.title,
            abbr: jsonItem.abbr,
            info: {
                date: jsonItem.info.date,
                venue: jsonItem.info.venue,
                theme: jsonItem.info.theme,
                noFirstHalf: jsonItem.info.noFirstHalf,
                noSecondHalf: jsonItem.info.noSecondHalf
            },
            intro: jsonItem.intro,
            artwork: jsonItem.artwork,
            repertoire: tempRepertoire
        }

        this.sovInfo.push(tempSOV);
    }
    return of(this.sovInfo);
  }
}