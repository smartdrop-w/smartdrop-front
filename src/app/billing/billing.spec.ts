import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillingComponent } from './billing.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
  });

  it('should create billing & finance component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle wallet amount and transaction calculations', () => {
    component.transactions = [
      { transactionId: 1, name: 'Suscripción Enterprise Mensual', date: '01/11/2026', amount: -49.99 },
      { transactionId: 2, name: 'Recarga Billetera Digital', date: '01/11/2026', amount: 100.00 }
    ];
    expect(component.transactions.length).toBe(2);
    expect(component.currentBalance).toBe(49.99);
    expect(component.monthlyAverage).toBe(49.99);
  });
});
