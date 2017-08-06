import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app/app.constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Hunt } from '../models/hunt';

@Injectable()
export class HuntService {    
    private serviceUrl: string = 'hunts'; 

    constructor(private http: Http, private config: Configuration) { 
        this.serviceUrl = config.ServerWithApiUrl + this.serviceUrl;
    }

    getHunts(): Observable<Hunt[]> {
        return this.http.get(this.serviceUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    saveHunt(userId: string, body: Object): Observable<Hunt> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serviceUrl + '/' + userId, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }
}