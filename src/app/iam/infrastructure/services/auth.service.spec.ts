import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
  });

  it('should return default user and clear storage when stored user JSON is corrupted', () => {
    localStorage.setItem('smartdrop-current-user-v2', '{bad-json');

    const user = service.getCurrentUser();

    expect(user.id).toBe(1);
    expect(user.email).toBe('smartdrop@gmail.com');
    expect(localStorage.getItem('smartdrop-current-user-v2')).toBeNull();
  });

  it('should return fallback and clear key on corrupted settings JSON', () => {
    localStorage.setItem('broken-key', 'not-json');

    const parsed = service.readStorageJson('broken-key', { ok: true });

    expect(parsed).toEqual({ ok: true });
    expect(localStorage.getItem('broken-key')).toBeNull();
  });
});
