import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoVacioEcommerceProductoComponent } from './carrito-vacio-ecommerce-producto.component';

describe('CarritoVacioEcommerceProductoComponent', () => {
  let component: CarritoVacioEcommerceProductoComponent;
  let fixture: ComponentFixture<CarritoVacioEcommerceProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritoVacioEcommerceProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoVacioEcommerceProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
