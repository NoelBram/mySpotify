import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyComponent } from './components/spotify/spotify.component';
import { AboutComponent } from './components/about/about.component';
import { FourOFourComponent } from './components/four-o-four/four-o-four.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'spotify' },
  { path: 'spotify', component: SpotifyComponent },
  { path: 'about', component: AboutComponent },
  { path: 'not-found', component: FourOFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
