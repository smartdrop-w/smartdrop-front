# SmartDrop - Frontend Web Application

Este repositorio contiene la aplicación frontend de **SmartDrop**, construida con **Angular 21** y **Angular Material**, integrada con la arquitectura de microservicios desplegada en Render Cloud y persistida en TiDB Serverless.

## 🚀 Tecnologías

- **Framework:** Angular 21 (Standalone Components)
- **UI Components:** Angular Material & Custom SCSS Design System
- **Testing:** Vitest / Angular CLI Testing Framework
- **Bundler:** Vite
- **Internacionalización:** ngx-translate (Soporte ES / EN)
- **Backend API:** Spring Boot Microservices (`https://smartdrop-backend.onrender.com`)

## 📋 Módulos y Flujos Implementados

1. **Autenticación e IAM:**
   - Registro de usuarios con validaciones inline y confirmación de contraseña.
   - Inicio de sesión con soporte para 2FA simulado y JWT Token.
   - Roles de usuario (`ROLE_ADMIN`, `ROLE_BREWER`, `ROLE_USER`).
2. **Gestión de Usuarios (Admin):**
   - Listado de usuarios registrados en el sistema (`GET /api/iam/auth/users`).
3. **Monitoreo e Inventario (Business):**
   - Gestión de tanques industriales/residenciales (`GET`, `POST`, `PUT`, `DELETE /api/v1/inventory/tanks`).
   - Reabastecimiento de niveles de líquido (`PUT /api/v1/inventory/tanks/{id}/replenish`).
   - Registro y deducción de consumo de agua por tanque (`POST /api/v1/inventory/consumptions`).
4. **Reportes y Analítica:**
   - Generación de reportes de eficiencia hídrica con gráficos dinámicos en HTML5 Canvas.
   - Persistencia de reportes en la nube (`POST` & `GET /api/v1/analytics/reports`).
   - Exportación de reportes en texto plano.
5. **Dashboard y Monitoreo IoT:**
   - Panel de control en tiempo real con niveles de tanques y métricas clave.

## 🛠️ Instalación y Ejecución

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
