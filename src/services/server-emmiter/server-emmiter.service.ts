import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {AuthHttp, JwtHelper} from 'angular2-jwt'

import {Observable} from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServerEmmiter{
    //  private serverUrl = 'http://localhost:8000'
    private serverUrl = 'http://ec2-13-58-71-207.us-east-2.compute.amazonaws.com:8000'
//        private serverUrl = 'https://sc-server-testing-utilizatorvalid.c9users.io'
    // private serverUrl = 'http://smartcityserver.azurewebsites.net/'
    constructor (private http:Http, private authHttp:AuthHttp){
    }

    emmitLocation(body:Object):Observable<any>{
        let endpoint = this.serverUrl+'/location'
        let bodyString  = JSON.stringify(body);
        let headers     = new Headers({"Content-Type":'application/json'});
        let options     = new RequestOptions({headers:headers});

        return this.authHttp.post(endpoint,bodyString,options)
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
    emmitNoiseLevel(body:Object):Observable<any>{
        let endpoint = this.serverUrl+'/noise'
        let bodyString  = JSON.stringify(body);
        let headers     = new Headers({"Content-Type":'application/json'});
        let options     = new RequestOptions({headers:headers});

        return this.authHttp.post(endpoint,bodyString,options)
            .map((res: Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }
    

}
