import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ControlComponent} from './control.component';
import {SliderComponent} from '../slider/slider.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

describe('ControlComponent', () => {
  let component: ControlComponent;
  let fixture: ComponentFixture<ControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ControlComponent,
        SliderComponent],
      imports: [
        FormsModule,
        HttpClientModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
