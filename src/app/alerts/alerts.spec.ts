import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create alerts incident monitor component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with alert settings and allow resolving alerts', () => {
    expect(component.settings.criticalAlerts).toBe(true);
    const testAlert = { type: 'critical' as const, title: 'Fuga crítica en Tanque 1', desc: 'Flujo anómalo detectado', time: '10:00 AM', resolved: false };
    component.alerts = [testAlert];
    expect(component.alerts[0].resolved).toBe(false);
    component.resolveAlert(testAlert);
    expect(testAlert.resolved).toBe(true);
  });
});
