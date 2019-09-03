import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() value: any;
  @Input() step: number;
  @Input() min: number;
  @Input() max: number;
  @Input() class: string;
  @Input() id: string;
  @Input() label: string;
  @Output() sliderEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  setValue(newvalue) {
    this.sliderEvent.emit(newvalue);
  }

}
