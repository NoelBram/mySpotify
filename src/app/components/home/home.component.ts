import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxTypedJsComponent } from 'ngx-typed-js';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  strings : string[] = ["Custom Mixtape on the Spotify App"];

  constructor() { }

  @ViewChild(NgxTypedJsComponent) typed: NgxTypedJsComponent;

  ngOnInit(): void {

   let options = new Typed('.typing-element', {
    strings: this.strings,
    typeSpeed: 20,
    shuffle: true,
    smartBackspace: true,
    loop: false,
    showCursor: false
  });

   
  }

}
