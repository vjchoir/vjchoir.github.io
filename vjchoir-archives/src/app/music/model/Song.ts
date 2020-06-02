import { Playlist } from './Playlist';

export interface Song {
    id: number;
    title: string;
    desc?: string;
    link: string;
    composer?: string;
    duration: string;
}