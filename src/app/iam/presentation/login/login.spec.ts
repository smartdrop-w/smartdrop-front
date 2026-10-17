import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        TranslateModule.forRoot(),
        MatIconModule
      ],
      providers: [TranslateService, provideRouter([]), provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
