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
    private userHuntUrl: string = 'userhunts';

    constructor(private http: Http, private config: Configuration) { 
        this.serviceUrl = config.ServerWithApiUrl + this.serviceUrl;
        this.userHuntUrl = config.ServerWithApiUrl + this.userHuntUrl;
    }

    getHunts(): Observable<Hunt[]> {
        return this.http.get(this.serviceUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    getHuntsByUserAndStatus(userId: string, status: string): Observable<Hunt[]> {
        return this.http.get(this.serviceUrl + '/' + userId + '/' + status)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    saveHunt(hunt: Hunt): Observable<Hunt> {
        let bodyString = JSON.stringify(hunt);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serviceUrl, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    updateHunt(hunt: Hunt): Observable<Hunt> {
        let bodyString = JSON.stringify(hunt);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.patch(this.serviceUrl, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    deleteHunt(huntId: string): Observable<Hunt> {
        let bodyString = JSON.stringify({huntId: huntId});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serviceUrl + '/delete' , bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    activateHunt(userId: string, huntId: string): Observable<Hunt> {
        let bodyString = JSON.stringify({userId: userId, huntId: huntId, status: 'active'});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.userHuntUrl, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    completeHunt(userId: string, huntId: string): Observable<Hunt> {
        let bodyString = JSON.stringify({userId: userId, huntId: huntId, status: 'complete'});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.patch(this.userHuntUrl, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }
}