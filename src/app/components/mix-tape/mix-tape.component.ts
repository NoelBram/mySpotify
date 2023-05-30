import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../login/user-profile';
import { SpotifyAuthService } from 'src/app/services/spotify.auth';

@Component({
  selector: 'app-mix-tape',
  templateUrl: './mix-tape.component.html',
  styleUrls: ['./mix-tape.component.css']
})
export class MixTapeComponent implements OnInit {

  constructor(private spotifyAuthService: SpotifyAuthService) {}

  async ngOnInit() {
    const clientId = '7ece4bb7979f433ab4a0a604bc2f97b5';
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    
    if (!code) {
      this.spotifyAuthService.redirectToAuthCodeFlow(clientId);
    } else {
      const accessToken = await this.spotifyAuthService.getAccessToken(clientId, await code);
      const profile = await this.spotifyAuthService.fetchProfile(accessToken);
      this.populateUI(profile);
    }
  }
  populateUI(profile: any) {
		document.getElementById('displayName')!.innerText = profile.display_name;
		document.getElementById('avatar')!.setAttribute('src', profile.images[0].url);
		document.getElementById('id')!.innerText = profile.id;
		document.getElementById('email')!.innerText = profile.email;
		document.getElementById('uri')!.innerText = profile.uri;
		document.getElementById('uri')!.setAttribute('href', profile.external_urls.spotify);
		document.getElementById('url')!.innerText = profile.href;
		document.getElementById('url')!.setAttribute('href', profile.href);
		document.getElementById('imgUrl')!.innerText = profile.images[0].url;
	  }
}





