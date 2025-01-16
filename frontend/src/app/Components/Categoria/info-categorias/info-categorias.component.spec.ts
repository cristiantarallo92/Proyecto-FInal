import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCategoriasComponent } from './info-categorias.component';

describe('InfoCategoriasComponent', () => {
  let component: InfoCategoriasComponent;
  let fixture: ComponentFixture<InfoCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
