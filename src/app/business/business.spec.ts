import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessComponent } from './business.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
  });

  it('should create business tanks component', () => {
    expect(component).toBeTruthy();
  });

  it('should manage tank levels and replenishment thresholds', () => {
    component.tanks = [
      { tankId: 1, name: 'Tanque Fermentador A1', capacity: 5000, current: 4200, liquidType: 'Agua Filtrada' },
      { tankId: 2, name: 'Tanque Reserva B2', capacity: 10000, current: 2000, liquidType: 'Agua Potable' }
    ];
    expect(component.tanks.length).toBe(2);
    expect(component.getLevel(component.tanks[0])).toBe(84);
    expect(component.closeToReplenish).toBe(1);
  });
});
