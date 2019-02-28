import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ContributorComponent } from './contributor.component';
import { ReposComponent } from './repos/repos.component';

@NgModule({
  declarations: [
    ContributorComponent,
    ReposComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class ContributorModule { }
