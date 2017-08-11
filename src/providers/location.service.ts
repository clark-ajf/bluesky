import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app/app.constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Location } from '../models/location';

@Injectable()
export class LocationService {    
    private serviceUrl: string = 'locations'; 
    private userHuntLocationUrl: string = 'userhuntlocations'; 

    constructor(private http: Http, private config: Configuration) { 
        this.serviceUrl = this.config.ServerWithApiUrl + this.serviceUrl;
        this.userHuntLocationUrl = this.config.ServerWithApiUrl + this.userHuntLocationUrl;
    }

    getHuntLocationsByUser(userId: string, huntId: string): Observable<Location[]> {
        return this.http.get(this.serviceUrl + '/' + userId + '/' + huntId)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    checkIn(userId: string, locationId: string): Observable<Location> {
        let bodyString = JSON.stringify({userId: userId, locationId: locationId, status: 'found'});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.userHuntLocationUrl, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }
}