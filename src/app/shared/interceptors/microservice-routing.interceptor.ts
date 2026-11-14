import { HttpInterceptorFn } from '@angular/common/http';

export const USE_AZURE_MICROSERVICES = true;
export const AZURE_VM_HOST = 'http://20.122.175.85';
export const MONOLITH_API_URL = 'https://smartdrop-backend.onrender.com';

const MICROSERVICE_PORT_RULES: ReadonlyArray<{ prefixes: readonly string[]; port: number }> = [
  { prefixes: ['/api/iam/', '/api/v1/profiles'], port: 8081 },
  { prefixes: ['/api/v1/inventory'], port: 8082 },
  { prefixes: ['/api/v1/analytics'], port: 8083 },
  { prefixes: ['/api/v1/support'], port: 8084 },
  { prefixes: ['/api/v1/finance'], port: 8085 },
];

/**
 * Resolves a monolithic API URL to the corresponding Azure microservice URL by path prefix.
 * Skips rewriting on HTTPS pages to prevent browser Mixed Content blocks against HTTP VM ports.
 */
export function resolveMicroserviceUrl(
  url: string,
  protocol: string = typeof window !== 'undefined' ? window.location.protocol : 'http:'
): string {
  if (!USE_AZURE_MICROSERVICES || protocol !== 'http:' || !url.startsWith(MONOLITH_API_URL)) {
    return url;
  }

  const path = url.slice(MONOLITH_API_URL.length);
  const match = MICROSERVICE_PORT_RULES.find((rule) =>
    rule.prefixes.some((prefix) => path.startsWith(prefix))
  );

  return match ? `${AZURE_VM_HOST}:${match.port}${path}` : url;
}

/**
 * Routes outgoing SmartDrop API requests to each Azure microservice container (ports 8081-8085).
 */
export const microserviceRoutingInterceptor: HttpInterceptorFn = (req, next) => {
  const routedUrl = resolveMicroserviceUrl(req.url);
  if (routedUrl === req.url) {
    return next(req);
  }
  return next(req.clone({ url: routedUrl }));
};
