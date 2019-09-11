import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksComponent } from './tracks.component';
import {SliderComponent} from '../slider/slider.component';
import {StepsComponent} from '../steps/steps.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {NavComponent} from '../navbar/nav.component';
import {TrackService} from '../../services/track.service';

const routes: Routes = [
  {path: 'tracks', component: TracksComponent},
  ];

describe('TracksComponent', () => {
  let component: TracksComponent;
  let fixture: ComponentFixture<TracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TracksComponent,
        SliderComponent,
        StepsComponent,
        NavComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
      ],
      providers: [
        TrackService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
