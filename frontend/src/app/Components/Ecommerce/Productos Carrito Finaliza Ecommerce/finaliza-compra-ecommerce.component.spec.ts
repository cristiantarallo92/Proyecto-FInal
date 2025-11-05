import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizaCompraEcommerceComponent } from './finaliza-compra-ecommerce.component';

describe('FinalizaCompraEcommerceComponent', () => {
  let component: FinalizaCompraEcommerceComponent;
  let fixture: ComponentFixture<FinalizaCompraEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizaCompraEcommerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizaCompraEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
