import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelEditionComponent } from './cancel-edition.component';

describe('CancelEditionComponent', () => {
  let component: CancelEditionComponent;
  let fixture: ComponentFixture<CancelEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
