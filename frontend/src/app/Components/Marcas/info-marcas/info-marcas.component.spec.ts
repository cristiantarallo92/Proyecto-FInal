import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMarcasComponent } from './info-marcas.component';

describe('InfoMarcasComponent', () => {
  let component: InfoMarcasComponent;
  let fixture: ComponentFixture<InfoMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoMarcasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
