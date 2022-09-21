import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CountUpModule } from 'ngx-countup';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SwiperModule } from 'swiper/angular';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from 'ngx-lightbox';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment.prod';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './components/footer/footer.component';

import { FourOFourComponent } from './components/four-o-four/four-o-four.component';

import { HeaderComponent } from './components/header/header.component';

import { SpotifyComponent } from './components/spotify/spotify.component';

import { OtherComponent } from './components/other/other.component';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FourOFourComponent,
    HeaderComponent,
    SpotifyComponent,
    OtherComponent,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    FlexModule,
    FontAwesomeModule,
    FormsModule,
    GalleryModule,
    HttpClientModule,
    LightboxModule,
    MaterialModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    NgbModule,
    ReactiveFormsModule,
    SwiperModule,
    CountUpModule,
    NgxTypedJsModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: BUCKET, useValue: environment.firebase.storageBucket }],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));