import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RememberAccountComponent } from './remember-account.component';

describe('RememberAccountComponent', () => {
  let component: RememberAccountComponent;
  let fixture: ComponentFixture<RememberAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RememberAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RememberAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
