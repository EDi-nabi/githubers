import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../store/reducers/';
import * as fromApp from '../store/reducers/app.reducers';
import * as fromOwner from '../store/reducers/owner.reducers';
import * as OwnerActions from '../store/actions/owner.actions';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public ownerState$: Observable<fromOwner.State>;
  public owner$: Observable<Owner | {}>;

  constructor(private store: Store<fromApp.AppState>) { }

  // get from state
  getOwnerState$() {
    return this.ownerState$
      ? this.ownerState$
      : this.ownerState$
      = this.store.select(fromStore.getOwnerState);
  }

  getOwner$() {
    return this.owner$
      ? this.owner$
      : this.owner$
      = this.store.select(fromStore.getOwner);
  }

  // dispatch actions
  dispatchLoadOwner(login: string) {
    this.store.dispatch(new OwnerActions.LoadOwner({ login }));
  }

  dispatchSaveOwner(owner: Owner) {
    this.store.dispatch(new OwnerActions.SaveOwner({ owner }));
  }

}
