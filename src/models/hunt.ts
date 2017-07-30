import { Location } from './location';

export class Hunt {
    constructor(
        public img: string,
        public message: string,
        public name: string, 
        public time: string,
        public locations: Location[]
        ){}

}