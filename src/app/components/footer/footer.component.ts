import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagramSquare, faSpotify, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  sy = faSpotify;
  ig = faInstagramSquare;
  fb = faFacebook;
  ln = faLinkedin;
  gh = faGithub;
  mu = faBars;
  constructor() { }

  ngOnInit(): void {
  }

  select = (el:any, all = false) => {
    el = el.trim()
    if (all) {
      return [document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  preloader() {
    let preloader = this.select('#preloader');
      if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }
  }

}
