import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/common/local-storage.service';
import { ProviderService } from 'src/app/services/provider.service';
import { SpotifyAuthService } from 'src/app/services/spotify.auth';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
	sy = faSpotify;
	form: FormGroup;
	email: FormControl = new FormControl("", [Validators.required, Validators.email]);
	password: FormControl = new FormControl("", [Validators.required]);
	date = Date();
	submitted: boolean = false;
	isLoading: boolean = false;
	responseMessage: any;

	user:any;
	playlists: any = [];

	constructor(private route: ActivatedRoute,
		private router: Router,
		private providerService: ProviderService,
		private localstorageService: LocalstorageService,
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private spotifyAuthService: SpotifyAuthService) {
			this.form = this.formBuilder.group({
				date: this.date,
				email: this.email,
				name: this.password,
			});
		}

	ngOnInit(): void {
		if (!localStorage.getItem('access_token')) {
			this.route.queryParams.subscribe(params => {
			const code = params.code;
			if (code) {
				this.spotifyAuthService.getAccessToken(code).subscribe(response => {
				this.user = response.user;
				this.localstorageService.setItem('access_token', response.access_token);
				this.localstorageService.setItem('user', JSON.stringify(response.user));
				const redirectUrl = sessionStorage.getItem('redirectUrl');
				if (redirectUrl) {
					sessionStorage.removeItem('redirectUrl');
					this.router.navigateByUrl(redirectUrl);
				} else {
					this.router.navigate(['/']);
				}
				});
			} else {
				this.isLoading = false;
			}});
		} else {
			this.authSpotify();
		}
	}

	authSpotify() {
		window.location.href = this.spotifyAuthService.getAuthorizationUrl();
	}	  

	onSubmit() {
		this.submitted = true;
		if (this.form.valid) {
		  this.isLoading = true;
		  // logic to submit form goes here
		  // ...
		  // Once the form has been submitted, you can set the response message:
		  this.responseMessage = 'Login successful!';
		  this.isLoading = false;
		} else {
		  this.responseMessage = 'Please enter a valid email and password.';
		}
	  }
	
	  getEmailErrorMessage() {
		if (this.email.hasError('required')) {
		  return 'You must enter an email address';
		}
		return this.email.hasError('email') ? 'Not a valid email' : '';
	  }
	
	  getPasswordErrorMessage() {
		return this.password.hasError('required') ? 'You must enter a password' : '';
	  }
}


