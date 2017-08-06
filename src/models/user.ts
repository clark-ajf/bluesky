export class User {
    constructor(
        public _id: string,
        public userId: number,
        public idToken: string,
        public displayName: string, 
        public givenName: string,
        public familyName: string,
        public email: string,
        public imageUrl: string,
        public organizer: boolean
        ){}

}