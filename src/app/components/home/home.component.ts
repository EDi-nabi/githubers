import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReposService } from 'src/app/services/repos.service';
import { debounceTime, switchMap, distinctUntilChanged, filter } from 'rxjs/operators';
import { RepoInterface } from 'src/app/interfaces/repo.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  repos$: Observable<RepoInterface[]>;
  search: FormControl = new FormControl();
  spinner = true;

  constructor(
    private reposService: ReposService
  ) { }

  ngOnInit() {
    this.repos$ = this.search.valueChanges.pipe(
      debounceTime(200),
      filter((search: string) => search.trim() !== ''),
      distinctUntilChanged(),
      switchMap((search: string) => {
        return this.reposService.findRepos(search);
      })
    );
  }
}
