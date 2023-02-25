import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersListInterface } from './../../interfaces/users-list.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit, OnChanges {
  @Input() user: string;
  @Input() repo: string;
  users$: Observable<UsersListInterface>;

  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.loadPage('');
  }

  loadPage(url: string) {
    this.users$ = this.usersService.getUsers$(url, this.user, this.repo);
  }

  ngOnChanges() {
    this.loadPage('');
  }

}
