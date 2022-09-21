import { animate } from '@angular/animations';
import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var anime: any;

@Component({
  selector: 'app-four-o-four',
  templateUrl: './four-o-four.component.html',
  styleUrls: ['./four-o-four.component.css']
})
export class FourOFourComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Animation code goes here
  anime({
        targets: '.row svg',
        translateY: 10,
        autoplay: true,
        loop: true,
        easing: 'easeInOutSine',
        direction: 'alternate'
      });
      
  anime({
        targets: '#zero',
        translateX: 10,
        autoplay: true,
        loop: true,
        easing: 'easeInOutSine',
        direction: 'alternate',
        scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
          rotateY: {value: '+=180', delay: 200},
      });
    
  }
}