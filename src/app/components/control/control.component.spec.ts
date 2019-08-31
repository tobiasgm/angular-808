import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercontrolComponent } from './control.component';

describe('MastercontrolComponent', () => {
  let component: MastercontrolComponent;
  let fixture: ComponentFixture<MastercontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastercontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastercontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
