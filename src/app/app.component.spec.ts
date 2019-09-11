import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ControlComponent} from './components/control/control.component';
import {RouterModule, Routes} from '@angular/router';
import {TracksComponent} from './components/tracks/tracks.component';
import {TrackEditComponent} from './components/track-edit/track-edit.component';
import {SliderComponent} from './components/slider/slider.component';
import {NavComponent} from './components/navbar/nav.component';
import {StepsComponent} from './components/steps/steps.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

const routes: Routes = [
  {path: 'tracks', component: TracksComponent},
  {path: 'track/:id', component: TrackEditComponent},
  {path: '', redirectTo: '/tracks', pathMatch: 'full'},
];
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
        ControlComponent,
        TracksComponent,
        TrackEditComponent,
        SliderComponent,
        StepsComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular808'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('NG-808');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Rhythm Composer NG-808');
  });
});
