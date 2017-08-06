import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "http://35.185.219.43:9000/";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;

    constructor() { }
}