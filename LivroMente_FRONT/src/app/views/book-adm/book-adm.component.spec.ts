import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAdmComponent } from './book-adm.component';

describe('BookAdmComponent', () => {
  let component: BookAdmComponent;
  let fixture: ComponentFixture<BookAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
