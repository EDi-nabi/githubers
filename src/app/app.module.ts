import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { ContributorsModule } from './components/contributors/contributors.module';
import { ContributorModule } from './components/contributor/contributor.module';
import { RepositoryModule } from './components/repository/repository.module';
import { GithubEffects } from './store/effects/github.efects';
import { reducers } from './store/reducers/app.reducers';
import { environment } from '../environments/environment';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
  ],
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GithubEffects]),
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ContributorsModule,
    ContributorModule,
    RepositoryModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
