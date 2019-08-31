import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TracksComponent} from './components/tracks/tracks.component';
import {TrackEditComponent} from './components/track-edit/track-edit.component';

const routes: Routes = [
  {path: 'tracks', component: TracksComponent},
  {path: 'track/:id', component: TrackEditComponent},
  {path: '', redirectTo: '/tracks', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
