import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { authGuard, adminGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuards', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('authGuard', () => {
    it('should redirect to /login when user is not logged in', () => {
      const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
      expect(result instanceof UrlTree).toBe(true);
      expect((result as UrlTree).toString()).toBe('/login');
    });

    it('should allow activation when user is logged in', () => {
      localStorage.setItem('smartdrop-current-user-v2', JSON.stringify({
        id: 1,
        email: 'test@smartdrop.com',
        fullName: 'Test User'
      }));
      const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
      expect(result).toBe(true);
    });
  });

  describe('adminGuard', () => {
    it('should redirect to /app/dashboard when user is not admin', () => {
      localStorage.setItem('smartdrop-current-user-v2', JSON.stringify({
        id: 2,
        email: 'user@smartdrop.com',
        fullName: 'Regular User',
        isAdmin: false
      }));
      const result = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));
      expect(result instanceof UrlTree).toBe(true);
      expect((result as UrlTree).toString()).toBe('/app/dashboard');
    });

    it('should allow activation when user is admin', () => {
      localStorage.setItem('smartdrop-current-user-v2', JSON.stringify({
        id: 1,
        email: 'admin@smartdrop.com',
        fullName: 'Admin User',
        isAdmin: true
      }));
      const result = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));
      expect(result).toBe(true);
    });
  });
});
