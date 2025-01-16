import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoresultsComponent } from './noresults.component';

describe('NoresultsComponent', () => {
  let component: NoresultsComponent;
  let fixture: ComponentFixture<NoresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
