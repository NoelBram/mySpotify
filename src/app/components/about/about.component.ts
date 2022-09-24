import { Component, OnInit } from '@angular/core';
import { faGithub, faAws } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  gh = faGithub;
  aws = faAws;

  constructor() { }

  ngOnInit(): void {
  }

}
