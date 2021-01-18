import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSalesComponent } from './board-sales.component';

describe('BoardSalesComponent', () => {
  let component: BoardSalesComponent;
  let fixture: ComponentFixture<BoardSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
