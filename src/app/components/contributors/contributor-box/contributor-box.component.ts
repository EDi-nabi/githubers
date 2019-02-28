import { Component, OnInit, Input } from '@angular/core';
import { Contributor } from 'src/app/models/contributor.model';

@Component({
  selector: 'app-contributor-box',
  templateUrl: './contributor-box.component.html',
  styleUrls: ['./contributor-box.component.less']
})
export class ContributorBoxComponent implements OnInit {
  @Input() contributor: Contributor;

  constructor() { }

  ngOnInit() {
  }

}
