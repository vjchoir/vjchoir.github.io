export interface Song {
    playlistId: number;
    id: number;
    title: string;
    desc?: string;
    src: string;
    composer?: string;
    duration: string;
}