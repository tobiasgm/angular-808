import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackEditComponent } from './track-edit.component';
import {SliderComponent} from '../slider/slider.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StepsComponent} from '../steps/steps.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'track/:id', component: TrackEditComponent}
];

describe('TrackEditComponent', () => {
  let component: TrackEditComponent;
  let fixture: ComponentFixture<TrackEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TrackEditComponent,
        SliderComponent,
        StepsComponent
    ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
