import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { UsersService } from '../../services/users.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent {
  user$: Observable<UserInterface>;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) {
    this.user$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.getUser$(params.user);
      }),
    );
  }

}
