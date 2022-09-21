import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
	selector: 'app-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

	form: FormGroup;
	name: FormControl = new FormControl("", [Validators.required]);
	email: FormControl = new FormControl("", [Validators.required, Validators.email]);
	message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(300)]);
	date = Date();
	submitted: boolean = false; // show and hide the success message
	isLoading: boolean = false; // disable the submit button if we're loading
	responseMessage: any; // the response message to show to the user

	constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) {
		this.form = this.formBuilder.group({
			name: this.name,
			email: this.email,
			message: this.message,
      		date: this.date
		});
	}
	ngOnInit(): void {} 
	onSubmit() {
		if (this.form.status == "VALID") {
			//this.form.disable(); // disable the form if it's valid to disable multiple submissions
			this.isLoading = true; // sending the post request async so it's in progress
			this.submitted = false; // hide the response message on multiple submits
			var db = "messages";
			this.firestore.collection(`${db}`).add({
				name: this.form.get("name").value,
				email: this.form.get("email").value,
				message: this.form.get("message").value,
				date: this.form.get("date").value,
				html: `<div>From: ${this.form.get("name").value} </div>
					<div>Email: <a href="mailto: ${this.form.get("email").value} "> ${this.form.get("email").value} </a></div>
					<div>Date: ${this.form.get("date").value} </div>
					<div>Message: ${this.form.get("message").value} </div>`
			}).then((res: any)  => {
				this.responseMessage = `Hi ${this.form.get("name").value}, thank you for your message. I will get back to you as soon.`;
				this.submitted = true; // show the response message
				this.form.reset();
				this.form.enable(); // re enable the form after a success
				this.isLoading = false; // re enable the submit button
			}).catch((e: any) => {
				this.responseMessage = e;
				this.submitted = true; // show the response message
				this.form.enable(); // re enable the form after a success
				this.isLoading = false; // re enable the submit button
			})
		}else{
			this.responseMessage = this.form.status;
			this.submitted = true; // show the response message
		}
	}
}