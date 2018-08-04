import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface Message {
    payload: any;
    type: string;
    operation: string;
    flags?: string;
  }

@Injectable()
export class DataService {

  fProject: Boolean = true;
  fStories: Boolean = false;
  currentProject: any;

    constructor(private http: HttpClient, private router: Router) {}

    public pFlagOn() {
      this.fProject = true;
      this.sFlagOff();
    }

    public pFlagOff() {
      this.fProject = false;
    }

    public sFlagOn() {
      this.fStories = true;
    }

    public sFlagOff() {
      this.fStories = false;
    }

    public create(message: Message): Observable<any> {
        return this.request('post', 'create' , message);
      }

      public read(message: Message): Observable<any> {
        return this.request('get', 'read', message);
      }
      public delete(message: Message): Observable<any> {
        return this.request('delete', 'delete', message );
      }

      private request(method: 'post'|'get'|'delete'|'put', type: string, message?: Message): Observable<any> {
        let base;
      //  let box = {message: message};
        if (method === 'post') {
          base = this.http.post(`/api/${type}`, message);
        }  else if (method === 'get' && message.type === 'stories') {
          base = this.http.get(`/api/${type}`, { headers: { type : message.type, id: message.payload.id }});
        }  else if (method === 'get') {
          base = this.http.get(`/api/${type}`, { headers: { type : message.type }});

        } else {
            base = this.http.delete(`/api/${type}`, { headers: { type: message.type, id: message.payload.id }});
        }

        const request = base.pipe(
        //   map((data: TokenResponse) => {
        //     if (data.token) {
        //       this.saveToken(data.token);
        //     }
        //     return data;
        //   })
        );

        return request;
      }
}
