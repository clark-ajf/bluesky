import { Hint } from './hint';

export class Location {
    constructor(
        public qrToken: string,
        public name: string, 
        public description: string,
        public hints: Hint[],
        public imageUrl: string,
        public status?: string
        ){}

}