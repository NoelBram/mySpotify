import { Component, OnInit } from '@angular/core';
import { UserProfile } from './user-profile';
import { SpotifyAuthService } from 'src/app/services/spotify.auth';

@Component({
  selector: 'app-mix-tape',
  templateUrl: './mix-tape.component.html',
  styleUrls: ['./mix-tape.component.css']
})

export class MixTapeComponent implements OnInit {
  profile: any;

  constructor(private spotifyAuthService: SpotifyAuthService) {}

  async ngOnInit() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const code = params.get("access_token");

    if (!code) {
      this.spotifyAuthService.getUserAuthorization();
    } else {
      this.spotifyAuthService.setAccessToken(code);
      const profile = await this.spotifyAuthService.fetchProfile();
      this.profile = profile;

      this.populateUI();
    }
  }

  populateUI() {
    document.getElementById("displayName")!.innerText = this.profile.display_name;
    document.getElementById("avatar")!.setAttribute("src", this.profile.images[0].url)
    document.getElementById("id")!.innerText = this.profile.id;
    document.getElementById("email")!.innerText = this.profile.email;
    document.getElementById("uri")!.innerText = this.profile.uri;
    document.getElementById("uri")!.setAttribute("href", this.profile.external_urls.spotify);
    document.getElementById("url")!.innerText = this.profile.href;
    document.getElementById("url")!.setAttribute("href", this.profile.href);
    document.getElementById("imgUrl")!.innerText = this.profile.images[0].url;
  }
}
