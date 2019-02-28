import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryComponent } from './repository.component';
import { RepoContributorsComponent } from './repo-contributors/repo-contributors.component';

@NgModule({
  declarations: [
    RepositoryComponent,
    RepoContributorsComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class RepositoryModule { }
