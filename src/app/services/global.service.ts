import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class GlobalService {
    constructor(private http: HttpClient) { /*empty*/ }
    CLIENT_ID = '7ece4bb7979f433ab4a0a604bc2f97b5'
    public getQuery(query: string) {
        // define common url
        const url: string = `https://api.spotify.com/v1/${query}`;

        // define header to specify token
        const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}`
        });

        // execute request
        return this.http.get(url, { headers });
    }
    private getAuthToken() {
        // define common url
        const url: string = `GET https://accounts.spotify.com/authorize`;

        // define header to specify token
        const headers = new HttpHeaders({
            'client_id': this.CLIENT_ID,
            'response_type': 'code',
            'redirect_uri': 'https://noel-brambila.web.app/home',

        });

        // execute request
        return this.http.get(url, { headers });
    }

}
      

