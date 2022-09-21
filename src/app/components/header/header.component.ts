import { Component, OnInit} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagramSquare, faSpotify, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  classList: any;
  sy = faSpotify;
  ig = faInstagramSquare;
  fb = faFacebook;
  ln = faLinkedin;
  gh = faGithub;
  mu = faBars;

  constructor() { }

  ngOnInit(): void {}

  public onToggleSidenav = () => {}

}