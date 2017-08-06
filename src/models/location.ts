import { Clue } from './clue';

export class Location {
    constructor(
        public _id: string,
        public qrToken: string,
        public name: string, 
        public description: string,
        public clues: Clue[],
        public imageUrl: string,
        public status?: string
        ){}

}