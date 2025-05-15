# 🚀 TFM Frontend - Rojo

Frontend para una plataforma de perfiles de desarrolladores y búsqueda de empleo.

## 📌 Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Cómo Configurar el Proyecto](#cómo-configurar-el-proyecto)
5. [Gestión de Ramas](#gestión-de-ramas)
6. [Enlaces Útiles](#enlaces-útiles)
7. [Contribuciones](#contribuciones)
8. [Licencia](#licencia)

## 📖 Descripción del Proyecto

Este frontend proporciona la interfaz de usuario para una plataforma diseñada para conectar desarrolladores con oportunidades laborales. Los desarrolladores pueden crear y gestionar sus portfolios profesionales, mientras que los reclutadores pueden publicar ofertas de empleo y buscar candidatos que se ajusten a sus necesidades.

**Características principales:**
- Interfaz de usuario moderna y responsiva
- Paneles personalizados para desarrolladores y reclutadores
- Sistema de perfiles detallados para desarrolladores
- Creación y gestión de ofertas de empleo
- Búsqueda avanzada y sistema de filtrado
- Experiencia de usuario optimizada para móviles y escritorio

## 💻 Tecnologías Utilizadas

* **React** (v18.2.0) - Biblioteca para construir interfaces de usuario
* **React DOM** (v18.2.0) - Renderización de React para el navegador
* **React Router DOM** (v6.22.3) - Navegación y enrutamiento
* **React Hook Form** (v7.51.0) - Manejo de formularios
* **React Icons** (v5.5.0) - Biblioteca de iconos
* **Tailwind CSS** (v3.4.1) - Framework de CSS utilitario
* **DaisyUI** (v5.0.28) - Componentes de Tailwind CSS
* **Vite** (v5.1.6) - Build tool y dev server
* **ESLint** (v8.57.0) - Linting y buenas prácticas

## 📂 Estructura del Proyecto Actual

```
tfm-frontend-rojo/
├── public/               # Archivos estáticos públicos
├── src/
│   ├── assets/          # Recursos estáticos
│   ├── features/        # Características por dominio
│   │   ├── auth/       # Autenticación
│   │   │   ├── login.jsx      # Componente de login
│   │   │   └── Register.jsx   # Componente de registro
│   │   ├── developer/  # Funcionalidades de desarrolladores
│   │   │   └── pages/  
│   │   │       ├── DevApplications.jsx
│   │   │       ├── DevProjectForm.jsx
│   │   │       ├── DeveloperEditProfile.jsx
│   │   │       ├── DeveloperPublicProfile.jsx
│   │   │       ├── Projects.jsx
│   │   │       └── ProjectsDetails.jsx
│   │   └── recruiters/ # Funcionalidades de reclutadores
│   │       └── pages/
│   │           ├── Offers.jsx
│   │           ├── RecApplications.jsx
│   │           ├── RecDashBoar.jsx
│   │           ├── RecOfferForm.jsx
│   │           ├── RecOffers.jsx
│   │           ├── RecProfile.jsx
│   │           └── RecruiterEditForm.jsx
│   ├── layout/         # Componentes de layout
│   │   └── MainLayout.jsx
│   ├── pages/          # Páginas principales
│   │   ├── ErrorPage.jsx
│   │   └── Home.jsx
│   ├── router/         # Configuración de rutas
│   │   └── AppRouter.jsx
│   ├── services/       # Servicios y API
│   │   └── authService.jsx
│   ├── index.css       # Estilos globales
│   └── main.jsx        # Punto de entrada
```

## ⚙️ Cómo Configurar el Proyecto

### Prerrequisitos

* **Node.js** instalado (v18 o superior recomendado).
* **pnpm** instalado (v10 o superior).

### Pasos para Configurar

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/FSDSTR0225/TFM-frontend-rojo.git
   cd tfm-frontend-rojo
   ```

2. **Instala las dependencias con pnpm:**
   ```bash
   pnpm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```

4. **Accede a la aplicación:**
   * La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

* **`pnpm dev`**: Inicia el servidor de desarrollo
* **`pnpm build`**: Compila la aplicación para producción
* **`pnpm preview`**: Previsualiza la versión compilada antes de desplegar
* **`pnpm lint`**: Ejecuta el linter para identificar problemas en el código

## 🌿 Gestión de Ramas

### Ramas Principales

- **`main`**: Rama de producción. Contiene el código estable y listo para desplegar.
- **`dev`**: Rama de desarrollo principal. Todas las funcionalidades se integran aquí antes de pasar a `main`.

### Ramas de Trabajo

Para nuevas funcionalidades o correcciones:

- **`feature/nombre-funcionalidad`**: Para nuevas funcionalidades
- **`fix/nombre-error`**: Para corrección de errores
- **`refactor/nombre-componente`**: Para mejoras de código existente

### Convenciones de Commits

```
[tipo]: descripción corta

Descripción detallada si es necesaria
```

Tipos de commit:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios que no afectan el código
- `refactor`: Mejoras en el código
- `test`: Cambios en tests
- `chore`: Cambios en configuración

## 🔗 Enlaces Útiles

* [Documentación del Proyecto](https://www.notion.so/1ce4f680cf84804ebde5e064376d2da1?v=1ce4f680cf8480ac9ae7000c147e9a86&pvs=4)
* [Tablero de Tareas](https://trello.com/b/SMoorg1M/tfm-fsdstr0225-rojo)
* [Repositorio Frontend](https://github.com/FSDSTR0225/TFM-frontend-rojo)
* [Repositorio Backend](https://github.com/FSDSTR0225/TFM-backend-rojo)

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nombre-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m "feat: nueva funcionalidad"`)
4. Sube tus cambios (`git push origin feature/nombre-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto se considera de uso privado para fines educativos.

## 👥 Autores

Desarrollado por **red-team-0225**

---

🎉 ¡Gracias por visitar este repositorio! Si tienes preguntas o sugerencias, no dudes en [abrir un issue](https://github.com/FSDSTR0225/TFM-frontend-rojo/issues).
