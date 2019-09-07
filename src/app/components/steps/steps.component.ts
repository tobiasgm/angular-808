import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Track} from '../../model/track';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  @Input() track: Track;
  @Input() currentStep: number;
  @Output() stepsEvent = new EventEmitter<{ step: number, i: number }>();

  constructor() {
  }

  ngOnInit() {
  }

  toggleStep(step, i) {
    this.stepsEvent.emit({step, i});
  }

}
