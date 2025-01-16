import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltraPersonasComponent } from './filtra-personas.component';

describe('FiltraPersonasComponent', () => {
  let component: FiltraPersonasComponent;
  let fixture: ComponentFixture<FiltraPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltraPersonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltraPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
