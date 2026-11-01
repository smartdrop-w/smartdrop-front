# SmartDrop - Frontend Web Application

Este repositorio contiene la aplicación frontend oficial de **SmartDrop**, desarrollada con **Angular 19** y **Angular Material**, integrada con la arquitectura de microservicios distribuida desplegada en Render Cloud y persistida en TiDB Cloud Serverless.

## Tecnologías

- **Framework:** Angular 19 (Standalone Components)
- **UI Components:** Angular Material & SCSS Design System
- **Testing:** Vitest / Angular CLI Testing Framework
- **Bundler:** Vite
- **Internacionalización:** ngx-translate (Soporte ES / EN)
- **Backend API:** Spring Boot Microservices (`https://smartdrop-backend.onrender.com`)

## Módulos y Flujos Implementados

1. **Autenticación e IAM:**
   - Registro de usuarios con validaciones inline y confirmación de contraseña.
   - Inicio de sesión con soporte para verificación de dos factores (2FA) y JWT Token.
   - Control de acceso basado en roles (`ROLE_ADMIN`, `ROLE_BREWER`, `ROLE_USER`).
2. **Gestión de Usuarios (Admin):**
   - Listado de usuarios registrados en el sistema (`GET /api/iam/auth/users`).
3. **Monitoreo e Inventario (Business):**
   - Gestión integral de tanques industriales y residenciales (`GET`, `POST`, `PUT`, `DELETE /api/v1/inventory/tanks`).
   - Reabastecimiento de niveles de líquido (`PUT /api/v1/inventory/tanks/{id}/replenish`).
   - Registro y deducción de consumo de agua por tanque (`POST /api/v1/inventory/consumptions`).
4. **Reportes y Analítica:**
   - Generación de reportes de eficiencia hídrica con gráficos dinámicos en HTML5 Canvas.
   - Persistencia de reportes en la nube (`POST` & `GET /api/v1/analytics/reports`).
   - Exportación de reportes en texto plano.
5. **Dashboard y Monitoreo IoT:**
   - Panel de control en tiempo real con niveles de tanques y métricas clave.

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (puerto 4200)
npm start

# 3. Compilar para producción
npm run build

# 4. Ejecutar pruebas unitarias
npm test -- --watch=false
```
