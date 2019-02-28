import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store/reducers/';
import * as fromApp from '../store/reducers/app.reducers';
import * as fromUi from '../store/reducers/ui.reducers';
import * as UiActions from '../store/actions/ui.actions';
import { Contributor } from '../models/contributor.model';
import { Repository } from '../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  uiState$: Observable<fromUi.State>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) { }

  // get from state
  getUiState$() {
    return this.uiState$
      ? this.uiState$
      : this.uiState$
      = this.store.select(fromStore.getUiState);
  }

  getLoading$() {
    return this.loading$
      ? this.loading$
      : this.loading$
      = this.store.select(fromStore.getUiLoading);
  }

  getLoaded$() {
    return this.loaded$
      ? this.loaded$
      : this.loaded$
      = this.store.select(fromStore.getUiLoaded);
  }

  // dispatch actions
  dispatchSetLoading(loading: boolean) {
    this.store.dispatch(new UiActions.SetLoading({ loading }));
  }

  dispatchSetLoaded(loaded: boolean) {
    this.store.dispatch(new UiActions.SetLoaded({ loaded }));
  }


}
