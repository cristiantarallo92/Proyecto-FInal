import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEcommerceProductoComponent } from './detalle-ecommerce-producto.component';

describe('DetalleEcommerceProductoComponent', () => {
  let component: DetalleEcommerceProductoComponent;
  let fixture: ComponentFixture<DetalleEcommerceProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleEcommerceProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEcommerceProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
