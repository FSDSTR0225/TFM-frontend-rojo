# Documentación del Proyecto TFM-Frontend-Rojo

## 1. Resumen del Proyecto

Este documento mantiene un registro actualizado del proyecto, sus funcionalidades y los cambios realizados por el equipo. Se seguirá el estilo de documentación de Warp para mantener consistencia.

### Estado Actual (30-04-2025)

El proyecto actualmente incluye:
- Sistema de registro de usuarios
- Estructura de navegación y enrutamiento base
- Componentes de layout modular y reutilizable
- Integración de bibliotecas UI (DaisyUI y react-icons)

## 2. Últimos Cambios (30-04-2025)

- Refactorización completa de los componentes de layout
- Implementación de estructura de router y componentes base
- Desarrollo de funcionalidades de login y registro
- Instalación y configuración de bibliotecas UI
- Implementación del sistema de documentación

## 3. Contribuciones por Miembro

### CARLOS (29-04-2025)

**Branch**: feature/refactor-layout, dev

**Descripción detallada**: 
- Implementación y prueba de nuevos componentes en el sistema
- Refactorización de la estructura de componentes para mejorar la organización
- Creación de un sistema de enlaces más modular y mantenible
- Mejoras en la estructura del layout general de la aplicación
- Se realizaron múltiples actualizaciones en el servicio de autenticación
- Se implementó una corrección en la funcionalidad de fetch
- Se incluyeron mejoras en el tema oscuro de la aplicación

**Archivos principales modificados**:
- src/components/*
- src/routes/*
- src/layouts/*
- src/services/authService.js
- src/layout/MainLayout.jsx
- src/layout/Header.jsx
- src/layout/Footer.jsx

**Estado**: Completado

## 4. Cómo Documentar Cambios

Para mantener esta documentación actualizada, utiliza el siguiente prompt al interactuar con Warp:

```
# Prompt para Actualización de Documentación en Warp

Warp, actualiza el archivo Documentation.md manteniendo la estructura existente. Es ESENCIAL que:

1. Las secciones "1. Resumen del Proyecto" y "2. Últimos Cambios" SIEMPRE permanezcan en las mismas posiciones al inicio del documento.

2. Debes actualizar estas secciones con la información nueva, pero nunca cambiar su ubicación.

3. La sección "3. Contribuciones por Miembro" debe mostrar las entradas ordenadas por fecha (más reciente primero).

4. Si hay varios cambios del mismo autor en la misma fecha, debes consolidarlos en una sola entrada.

## Información para actualizar:

Nombre: [NOMBRE]
Fecha: [FECHA en formato DD-MM-YYYY]
Branch: [BRANCH]

Descripción detallada:
[DESCRIPCIÓN COMPLETA DE LOS CAMBIOS]

Archivos principales modificados:
- [RUTA/ARCHIVO]
- [RUTA/ARCHIVO]

Estado: [COMPLETADO/EN PROGRESO/EN REVISIÓN]

## Para actualizar "Estado Actual" (Sección 1):
Las siguientes funcionalidades o cambios deben añadirse/modificarse en el "Estado Actual":
- [NUEVA FUNCIONALIDAD 1]
- [NUEVA FUNCIONALIDAD 2]

## Para actualizar "Últimos Cambios" (Sección 2):
Añade estos nuevos cambios al inicio de la lista de "Últimos Cambios":
- [NUEVO CAMBIO 1]
- [NUEVO CAMBIO 2]

IMPORTANTE: Mantén siempre las secciones 1 y 2 al inicio del documento, y actualiza la fecha en ambas secciones al día actual [FECHA].
```

Warp procesará esta información y actualizará el documento manteniendo su estructura y el historial de cambios previos.