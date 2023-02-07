import { Component, OnInit } from '@angular/core';
import { UserProfile } from './user-profile';

@Component({
  selector: 'app-mix-tape',
  templateUrl: './mix-tape.component.html',
  styleUrls: ['./mix-tape.component.css']
})

export class MixTapeComponent implements OnInit {
  clientId = "7ece4bb7979f433ab4a0a604bc2f97b5";  // Replace with your client id
  code: string;
  profile: UserProfile;

  constructor() {}

  ngOnInit() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    this.code = params.get("access_token");

    if (!this.code) {
      this.redirectToAuthCodeFlow();
    } else {
      this.fetchProfile();
    }
  }

  redirectToAuthCodeFlow() {
    const params = new URLSearchParams();
    params.append("client_id", this.clientId);
    params.append("response_type", "token");
    params.append("redirect_uri", "http://localhost:4200/callback");
    params.append("scope", "user-read-private user-read-email");

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  async fetchProfile() {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${this.code}` }
    });

    this.profile = await result.json();
    this.populateUI();
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
