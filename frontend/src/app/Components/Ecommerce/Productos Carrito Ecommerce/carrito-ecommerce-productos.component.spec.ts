import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoEcommerceProductosComponent } from './carrito-ecommerce-productos.component';

describe('CarritoEcommerceProductosComponent', () => {
  let component: CarritoEcommerceProductosComponent;
  let fixture: ComponentFixture<CarritoEcommerceProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritoEcommerceProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoEcommerceProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
