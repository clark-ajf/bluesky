import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "http://35.197.126.9:9000/";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;

    constructor() { }
}
