import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticle } from './edit-article';

describe('EditArticle', () => {
  let component: EditArticle;
  let fixture: ComponentFixture<EditArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
