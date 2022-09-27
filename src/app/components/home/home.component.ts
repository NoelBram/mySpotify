import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxTypedJsComponent } from 'ngx-typed-js';
import { LocalstorageService } from 'src/app/common/local-storage.service';
import { ProviderService } from 'src/app/services/provider.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  strings : string[] = ["Custom Mixtape on the Spotify App"];
  user:any;
  playlists: any = [];
  isLoading: boolean = true;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private providerPlaylist: ProviderService,
    private localstorageService: LocalstorageService,) { }

  @ViewChild(NgxTypedJsComponent) typed: NgxTypedJsComponent;

  ngOnInit(): void {

    if (localStorage.getItem('access_token')) {
      this.providerPlaylist.getUser()
        .subscribe(data => {
          this.isLoading = false;
          this.user = data.user;
          this.askForNotificationPermission();
          }, error => this.redirectToLogin());
    } else {
      this.route.queryParams.subscribe(params => {
        const code = params.code;
        if (code) {
          this.providerPlaylist.getSpotifyToken(code).subscribe(response => {
            this.isLoading = false;
            this.user = response.user;
            localStorage.setItem('access_token', response.access_token);
          });
        } else {
          this.isLoading = false;
          this.redirectToLogin();
        }
      });
    }
  }
  redirectToLogin() {
    this.localstorageService.removeItem('access_token');
    this.localstorageService.removeItem('user');
    this.router.navigate(['/login']);
  }

  askForNotificationPermission() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: 'BEWrjXKrN7b4hUiqIV-cLYJvUjTI_ntQXV3kz7ZIWgBnbzSl-jvG8hzamjK71cKsBaSrF0pwwdl6TOEH9Lguk4Q'})
            .then(subscription => {
              if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                  console.log(permission);
                  if (permission === 'granted') {
                    this.providerPlaylist.addPushSubscriber(subscription.toJSON()).subscribe()
                  }
                })
              }
            });
        }).catch(error => console.log(error));
    }
  }

}
