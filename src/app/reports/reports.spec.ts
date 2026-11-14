import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsComponent } from './reports.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
  });

  it('should create analytics reports component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate efficiency and water savings upon report generation', () => {
    component.timePeriod = 'Last 7 Days';
    component.reportType = 'Usage Analytics';
    component.location = 'All Locations';
    component.generateReport();

    expect(component.efficiencyScore).toBeGreaterThanOrEqual(50);
    expect(component.waterSaved).toBeGreaterThan(0);
    expect(component.recentReports.length).toBeGreaterThan(0);
  });
});
