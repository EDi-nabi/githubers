import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContributorsComponent } from '../components/contributors/contributors.component';
import { ContributorComponent } from '../components/contributor/contributor.component';
import { RepositoryComponent } from '../components/repository/repository.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { LoadStoreGuard } from './guards/load-store.guard';
import { ContributorsGuard } from './guards/contributors.guard';
import { ContributorGuard } from './guards/contributor.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/contributors/1/contributions', pathMatch: 'full', canActivate: [LoadStoreGuard] },
  {
    path: 'contributors/:page/:sort',
    component: ContributorsComponent,
    pathMatch: 'full',
    canActivate: [LoadStoreGuard, ContributorsGuard],
  },
  { path: 'contributor/:login', component: ContributorComponent, canActivate: [LoadStoreGuard, ContributorGuard] },
  { path: 'repository/:user/:name', component: RepositoryComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found' } },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
