import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StepsComponent} from './steps.component';
import {Track} from '../../model/track';
import {By} from '@angular/platform-browser';

const MOCKTRACK: Track = {
  id: 0,
  filename: 'test.mp3',
  pattern: [0, 0, 0, 0],
  buffer: null,
  inputgain: null,
  inputgainValue: 1,
  stereopanner: null,
  stereopannerValue: 0.5,
  convolver: null,
  convolverValue: 0.5,
  audiobuffer: null
};

describe('StepsComponent', () => {
  let component: StepsComponent;
  let fixture: ComponentFixture<StepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StepsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsComponent);
    component = fixture.componentInstance;
    component.track = MOCKTRACK;
    component.currentStep = 2;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle pattern value', () => {
    spyOn(component, 'toggleStep');
    const div = fixture.debugElement.query(By.css('.s0 .active')).nativeElement;
    div.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.toggleStep).toHaveBeenCalledWith(0, 1);
    });
  });
});
