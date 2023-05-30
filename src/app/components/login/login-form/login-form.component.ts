import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/common/local-storage.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
	isLoading: boolean = false;
	sy = faSpotify;
	private clientId = '7ece4bb7979f433ab4a0a604bc2f97b5';

	constructor(){}

	ngOnInit() {}
	// async ngOnInit() {
	// 	const params = new URLSearchParams(window.location.search);
    // 	const code = params.get("code");

	// 	if (!code) {
	// 		this.spotifyAuthService.redirectToAuthCodeFlow(this.clientId);
	// 	  } else {
	// 		const accessToken = this.spotifyAuthService.getAccessToken(this.clientId, code);
	// 		const profile =  this.spotifyAuthService.fetchProfile(await accessToken);
	// 		this.populateUI(profile);
	// 	  }
    
	// }

	authSpotify() {
		window.location.href = '/mixtape'
	}	  
}


