import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../app/app.constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/user';

@Injectable()
export class UserService {    
    private serviceUrl: string = 'users'; 

    constructor(private http: Http, private config: Configuration) { 
        this.serviceUrl = this.config.ServerWithApiUrl + this.serviceUrl;
    }

    loginOrSignUp(body: Object): Observable<User> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serviceUrl, bodyString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }
}