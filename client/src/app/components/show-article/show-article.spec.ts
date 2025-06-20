import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowArticle } from './show-article';

describe('ShowArticle', () => {
  let component: ShowArticle;
  let fixture: ComponentFixture<ShowArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
