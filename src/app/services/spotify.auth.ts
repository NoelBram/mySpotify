import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { MixTapeComponent } from '../components/mix-tape/mix-tape.component';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private clientId = '7ece4bb7979f433ab4a0a604bc2f97b5';
  private redirectUri = 'http://localhost:4200/login';
  private scope = 'user-library-read user-read-private user-read-email';
  private accessToken: string;
  private code: string;

  constructor(private http: HttpClient) { }

  /**
   * Get the Spotify authorization URL to redirect the user to
   */
  getAuthorizationUrl() {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('redirect_uri', this.redirectUri)
      .set('scope', this.scope)
      .set('response_type', 'token');

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Get the access token from the Spotify authorization code
   * @param code The authorization code received from Spotify
   */
  getAccessToken(code: string): Observable<any> {
    const params = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId);
  
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
  
    return this.http.post<any>('https://accounts.spotify.com/api/token', params.toString(), { headers })
      .pipe(tap((res: { access_token: string; }) => this.setAccessToken(res.access_token))
      );
  }
  
  /**
   * Get the currently logged-in user's Spotify profile
   */
  async fetchProfile(): Promise<MixTapeComponent> {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${this.code}` }
    });

    return result.json();
  }

  async redirectToAuthCodeFlow() {
    const authorizationUrl = this.getAuthorizationUrl();
    window.location.href = authorizationUrl;
  }

}
