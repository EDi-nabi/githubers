import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.less']
})
export class UserBoxComponent implements OnInit {
  @Input() user: string;
  user$: Observable<UserInterface>;

  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.user$ = this.usersService.getUser$(this.user);
  }

}
