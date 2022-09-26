import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
    CLIENT_ID: string = '';
  constructor(private http: HttpClient){}

  auth(): Observable<any> {
    return this.http.get(
      'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + '7ece4bb7979f433ab4a0a604bc2f97b5' +
      '&scope=' + encodeURIComponent('user-read-email playlist-read-private playlist-read-collaborative user-library-read user-library-modify') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:4200/callback')
    );
  }
}