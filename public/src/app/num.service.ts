import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class NumService {
  private numUrl = 'http://localhost:3000/api/';  // URL to web api
  private headers: Headers
  constructor(private http: Http) { }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  private injectHeaders(): Object{
    let headers = new Headers()
    headers.append('req_id', localStorage.getItem('req_id'))
    return {headers: headers};
  }
  
  submitLuckyNumber(num): Promise<any> {
    return this.http.get(this.numUrl+num, this.injectHeaders())
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  getDefaults(): Promise<any> {
    return this.http.get(this.numUrl+'default', this.injectHeaders())
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
}