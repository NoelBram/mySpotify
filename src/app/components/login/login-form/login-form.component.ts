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
	sy = faSpotify;
	form: FormGroup;
	email: FormControl = new FormControl("", [Validators.required, Validators.email]);
	password: FormControl = new FormControl("", [Validators.required]);
	date = Date();
	submitted: boolean = false; // show and hide the success message
	isLoading: boolean = false; // disable the submit button if we're loading
	responseMessage: any; // the response message to show to the user

	user:any;
	playlists: any = [];
  
	constructor(private route: ActivatedRoute,
		private router: Router,
		private providerService: ProviderService,
		private localstorageService: LocalstorageService,
		private formBuilder: FormBuilder, 
		private http: HttpClient) {
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
				this.providerService.getSpotifyToken(code).subscribe(response => {
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
			  }
			});
		  } else {
			this.authSpotify();
		  }
	} 
	onSubmit() {
		if (this.form.status == "VALID") {
			//this.form.disable(); // disable the form if it's valid to disable multiple submissions
			this.isLoading = true; // sending the post request async so it's in progress
			this.submitted = false; // hide the response message on multiple submits
			// db = "messages";
			// this.firestore.collection(`${db}`).add({
			// 	name: this.form.get("name").value,
			// 	email: this.form.get("email").value,
			// 	message: this.form.get("message").value,
			// 	date: this.form.get("date").value,
			// 	html: `<div>From: ${this.form.get("name").value} </div>
			// 		<div>Email: <a href="mailto: ${this.form.get("email").value} "> ${this.form.get("email").value} </a></div>
			// 		<div>Date: ${this.form.get("date").value} </div>
			// 		<div>Message: ${this.form.get("message").value} </div>`
			// }).then((res: any)  => {
			// 	this.responseMessage = `Hi ${this.form.get("name").value}, thank you for your message. I will get back to you as soon.`;
			// 	this.submitted = true; // show the response message
			// 	this.form.reset();
			// 	this.form.enable(); // re enable the form after a success
			// 	this.isLoading = false; // re enable the submit button
			// }).catch((e: any) => {
			// 	this.responseMessage = e;
			// 	this.submitted = true; // show the response message
			// 	this.form.enable(); // re enable the form after a success
			// 	this.isLoading = false; // re enable the submit button
			// })
		}else{
			this.responseMessage = this.form.status;
			this.submitted = true; // show the response message
		}
	}
	authSpotify() {
		this.isLoading = true;
		localStorage.removeItem('access_token');
		this.providerService.getSpotifyAuthUrl().subscribe(response => {
			window.open(response.url, '_self');
		});
	}
}
