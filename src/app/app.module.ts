import {APP_BASE_HREF} from "@angular/common";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CountUpModule } from 'ngx-countup';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SwiperModule } from 'swiper/angular';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from 'ngx-lightbox';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { environment } from '../environments/environment.prod';
import { SpotifyAuthService } from './services/spotify.auth';
import { AuthInterceptor } from './services/auth-interceptor';

import { LoadingComponent } from "./common/loading/loading.component";
import { routes } from "./app-routing.module"

import { AboutComponent } from './components/about/about.component';

import { AppComponent } from './app.component';

import { FooterComponent } from './components/footer/footer.component';

import { FourOFourComponent } from './components/four-o-four/four-o-four.component';

import { GlobalService } from './services/global.service';

import { HeaderComponent } from './components/header/header.component';

import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { LoginHeaderComponent } from './components/login/login-header/login-header.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';

import { MixMateComponent } from './components/mix-mate/mix-mate.component';

import { MixTapeComponent } from './components/mix-tape/mix-tape.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    FooterComponent,
    FourOFourComponent,
    HeaderComponent,
    HomeComponent,
    LoadingComponent,
    LoginComponent,
    LoginFormComponent,
    LoginHeaderComponent,
    MixMateComponent,
    MixTapeComponent,
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
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CountUpModule,
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
    NgxTypedJsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    SwiperModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (createTranslateLoader),
    //     deps: [HttpClient],
    //   }
    // }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: APP_BASE_HREF, useValue : '/' }
  ]

})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));