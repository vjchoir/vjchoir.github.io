import { Song } from './Song';

export interface Playlist {
    id: number;
    tracks: Song[];
    name?: string;
    desc?: string;
}