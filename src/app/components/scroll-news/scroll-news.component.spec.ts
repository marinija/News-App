import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollNewsComponent } from './scroll-news.component';

describe('ScrollNewsComponent', () => {
  let component: ScrollNewsComponent;
  let fixture: ComponentFixture<ScrollNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
