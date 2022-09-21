import { Component, OnInit } from '@angular/core';
import { faGithub, faAws } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
  gh = faGithub;
  aws = faAws;

  constructor() { 
  }

  ngOnInit(): void {}

}
