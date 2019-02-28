import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorBoxComponent } from './contributor-box.component';

describe('ContributorBoxComponent', () => {
  let component: ContributorBoxComponent;
  let fixture: ComponentFixture<ContributorBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributorBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
