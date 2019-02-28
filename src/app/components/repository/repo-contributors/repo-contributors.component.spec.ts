import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoContributorsComponent } from './repo-contributors.component';

describe('RepoContributorsComponent', () => {
  let component: RepoContributorsComponent;
  let fixture: ComponentFixture<RepoContributorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoContributorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
