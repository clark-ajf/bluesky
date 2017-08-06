export class User {
    constructor(
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