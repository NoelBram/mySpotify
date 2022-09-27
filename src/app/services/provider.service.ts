import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {interval, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(
    private http: HttpClient
  ) {
    // Every 25 minutes
    interval(1000 * 60 * 25).subscribe(x => {
      this.getRefreshAcessToken().subscribe(res => {
        localStorage.setItem('access_token', res.access_token);
      });
    });
  }
  getSpotifyAuthUrl(): Observable<any> {
    return this.http.get('auth/spotify_login_url');
  }

  getSpotifyToken(code: string): Observable<any> {
    return this.http.post('auth/spotify_get_token', { code });
  }

  getRefreshAcessToken(): Observable<any> {
    return this.http.get('auth/refresh_access_token');
  }

  getUser(): Observable<any> {
    return this.http.get('auth/user');
  }

  addPushSubscriber(sub: any): Observable<any> {
    return this.http.post('api/users/push_notif_preference', {preference: sub});
  }

  logoutUser(): Observable<any> {
    return this.http.post('api/auth/logout', {});
  }

  // PLAYLIST

  getPlaylists(): Observable<any> {
    return this.http.get('api/playlists');
  }

  newPlaylist(playlist: any): Observable<any> {
    return this.http.post('api/playlists/create', { playlist });
  }

  updatePlaylist(playlist: any): Observable<any> {
    return this.http.put('api/playlists/' + playlist.id, { playlist });
  }

  getPlaylist(id: number): Observable<any> {
    return this.http.get('api/playlists/' + id);
  }

  getExplore(): Observable<any> {
    return this.http.get('api/playlists/explore');
  }

  getSubscriptions(): Observable<any> {
    return this.http.get('api/playlists/subscriptions');
  }

  getAccessiblePlaylists(trackId: any): Observable<any> {
    const params = new HttpParams().set('track_id', trackId);
    return this.http.get('api/playlists/accessible', {params});
  }

  subscripbedToPlaylist(playlistId: number): Observable<any> {
    return this.http.post('api/playlists/' + playlistId + '/subscribed', {});
  }

  unsubscripbedToPlaylist(playlistId: number): Observable<any> {
    return this.http.post('api/playlists/' + playlistId + '/unsubscribed', {});
  }

  getPlaylistStats(id: number): Observable<any> {
    return this.http.get('api/playlists/' + id + '/stats');
  }

  getPlaylisRecommendations(id: number): Observable<any> {
    return this.http.get('api/playlists/' + id + '/recommendations');
  }

  getPlaylistShareLink(id: number): Observable<any> {
    return this.http.get('api/playlists/' + id + '/shareable_link');
  }

  getPlaylistIdFromHash(hash: string): Observable<any> {
    return this.http.get('api/playlists/id_from_hash/' + hash);
  }

  // TACKS

  searchTracks(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    return this.http.get('api/tracks/search', {params});
  }

  searchByTrackId(trackId: string): Observable<any> {
    const params = new HttpParams().set('track_id', trackId);
    return this.http.get('api/tracks/search', {params});
  }

  addTrackToPlaylist(playlistId: number, trackId: string) {
    return this.http.post('api/playlists/' + playlistId + '/add_track', { track_id: trackId });
  }

  removeTrackToPlaylist(trackId: string) {
    return this.http.delete('api/tracks/' + trackId);
  }

  upVotePatch(trackId: number): Observable<any> {
    return this.http.patch('api/tracks/' + trackId + '/up_vote', {});
  }

  downVotePatch(trackId: number): Observable<any> {
    return this.http.patch('api/tracks/' + trackId + '/down_vote', {});
  }

  // PLAYER

  playQueue(playlistId: number, queue: string): Observable<any> {
    return this.http.post('api/playlists/' + playlistId + '/play', {queue});
  }

  getUserPlayerDevices(): Observable<any> {
    return this.http.get('api/users/player/devices');
  }

  getRecentlyPlayedTracks(): Observable<any> {
    return this.http.get('api/users/player/recently_played_tracks');
  }
}