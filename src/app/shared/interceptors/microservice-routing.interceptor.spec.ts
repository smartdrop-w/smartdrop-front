import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {
  AZURE_VM_HOST,
  MONOLITH_API_URL,
  microserviceRoutingInterceptor,
  resolveMicroserviceUrl,
} from './microservice-routing.interceptor';

describe('microserviceRoutingInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([microserviceRoutingInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const routeCases: Array<{ label: string; path: string; port: number }> = [
    { label: 'IAM auth', path: '/api/iam/auth/login', port: 8081 },
    { label: 'Profiles', path: '/api/v1/profiles/by-user/1', port: 8081 },
    { label: 'Inventory', path: '/api/v1/inventory/tanks/user/1', port: 8082 },
    { label: 'Analytics', path: '/api/v1/analytics/reports?userId=1', port: 8083 },
    { label: 'Support', path: '/api/v1/support/alerts/user/1', port: 8084 },
    { label: 'Finance', path: '/api/v1/finance/wallet/user/1', port: 8085 },
  ];

  routeCases.forEach(({ label, path, port }) => {
    it(`should route ${label} (${path}) to port ${port}`, () => {
      http.get(`${MONOLITH_API_URL}${path}`).subscribe();

      const req = httpMock.expectOne(`${AZURE_VM_HOST}:${port}${path}`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  it('should not rewrite to HTTP Azure ports when page protocol is HTTPS', () => {
    const url = `${MONOLITH_API_URL}/api/v1/finance/wallet/user/1`;
    expect(resolveMicroserviceUrl(url, 'https:')).toBe(url);
  });

  it('should leave external URLs untouched', () => {
    const externalUrl = 'https://example.com/data.json';
    expect(resolveMicroserviceUrl(externalUrl)).toBe(externalUrl);
  });
});
