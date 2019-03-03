import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { UserComponent } from '../components/user/user.component';
import { RepoComponent } from '../components/repo/repo.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'repo/:user/:repo', component: RepoComponent },
  { path: 'user/:user', component: UserComponent },

  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found' } },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
