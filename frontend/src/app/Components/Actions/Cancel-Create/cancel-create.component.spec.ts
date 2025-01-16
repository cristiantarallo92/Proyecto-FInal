import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCreateComponent } from './cancel-create.component';

describe('CancelCreateComponent', () => {
  let component: CancelCreateComponent;
  let fixture: ComponentFixture<CancelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
