import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';
import { MixMateComponent } from './components/mix-mate/mix-mate.component';
import { MixTapeComponent } from './components/mix-tape/mix-tape.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'about', component: AboutComponent },
  { path: 'auth/spotify_get_token', component: LoginComponent},
  { path: 'callback', component: LoginComponent},
  { path: 'home',      component: HomeComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'mixmate', component: MixMateComponent },
  { path: 'mixtape', component: MixTapeComponent },
  { path: 'not-found', component: FourOFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
