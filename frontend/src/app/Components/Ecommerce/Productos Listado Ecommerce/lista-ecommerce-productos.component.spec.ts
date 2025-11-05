import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEcommerceProductosComponent } from './lista-ecommerce-productos.component';

describe('ListaEcommerceProductosComponent', () => {
  let component: ListaEcommerceProductosComponent;
  let fixture: ComponentFixture<ListaEcommerceProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEcommerceProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEcommerceProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
