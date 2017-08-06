import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "http://104.197.138.162:9000/";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;

    constructor() { }
}