import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less'],
})
export class SpinnerComponent implements OnInit {
  @Input() show: boolean;

  constructor() { }

  ngOnInit() {
  }
}
