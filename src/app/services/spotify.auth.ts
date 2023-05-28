import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { MixTapeComponent } from '../components/mix-tape/mix-tape.component';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private clientId : string;
  private redirectUri : string;
  private scope = 'user-library-read user-read-private user-read-email';
  private accessToken: string;
  private code: string;
  private codeChallenge: string;
  private state = this.generateRandomString(16);

  private codeVerifier :string;

  generateRandomString(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  constructor(private http: HttpClient) { }

  async generateCodeChallenge(codeVerifier: string): Promise<string> {
    function base64encode(arrayBuffer: ArrayBuffer): string {
      const uint8Array = new Uint8Array(arrayBuffer);
      const base64 = Array.from(uint8Array)
        .map(byte => String.fromCharCode(byte))
        .join('');
      return btoa(base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
  }

  /*
   * Get the Spotify authorization URL to redirect the user to
   */
  getAuthorizationUrl() {
    this.clientId = '7ece4bb7979f433ab4a0a604bc2f97b5';
    this.redirectUri = 'http://localhost:4200/login';
    this.codeVerifier = this.generateRandomString(128);
  
    this.state = this.generateRandomString(16);
    this.scope = 'user-read-private user-read-email';
  
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', this.clientId)
      .set('scope', this.scope)
      .set('redirect_uri', this.redirectUri)
      .set('state', this.state)
      .set('code_challenge_method', 'S256')
      .set('code_challenge', this.codeChallenge);

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getUserAuthorization() {
    this.codeChallenge = await this.generateCodeChallenge(this.codeVerifier);

    localStorage.setItem('code_verifier', this.codeVerifier);
    const authorizationUrl = this.getAuthorizationUrl();
    window.location.href = authorizationUrl;

    const urlParams = new URLSearchParams(window.location.search);
    this.code = urlParams.toString();
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
      .set('client_id', this.clientId)
      .set('code_verifier', this.codeVerifier);
  
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
    this.accessToken = localStorage.getItem('access_token');
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${this.accessToken}` }
    });

    return result.json();
  }

}
