import { Location } from './location';
import { User } from './user';

export class Hunt {
    constructor(
        public _id: string,
        public name: string, 
        public shortDescription: string,
        public longDescription: string,
        public locations: Location[],
        public isDeleted: Boolean,
        public imageUrl: string,
        public owner: User,
        public status?: string
        ){}

}