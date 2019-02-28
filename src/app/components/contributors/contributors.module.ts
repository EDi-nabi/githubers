import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContributorsComponent } from './contributors.component';
import { ContributorBoxComponent } from './contributor-box/contributor-box.component';

@NgModule({
  declarations: [
    ContributorsComponent,
    ContributorBoxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ContributorsModule { }
