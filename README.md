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

**Versión:** 0.0.0 (Desarrollo inicial)

## 💻 Tecnologías Utilizadas

* **React** (v19.0.0) - Biblioteca para construir interfaces de usuario.
* **React DOM** (v19.0.0) - Renderización de React para el navegador.
* **React Router** (v7.5.0) - Navegación y enrutamiento para aplicaciones React.
* **React Hook Form** (v7.55.0) - Manejo de formularios con React Hooks.
* **Tailwind CSS** (v4.1.3) - Framework de CSS utilitario.
* **Vite** (v6.2.0) - Herramienta de construcción frontend rápida.
* **ESLint** (v9.21.0) - Herramienta de linting para identificar problemas en el código.

## 📂Posible Estructura del Proyecto

```
tfm-frontend-rojo/
├── public/         # Archivos estáticos accesibles públicamente
├── src/            # Código fuente de la aplicación
│   ├── assets/     # Imágenes, fuentes y otros recursos
│   ├── components/ # Componentes reutilizables
│   ├── contexts/   # Contextos de React
│   ├── hooks/      # Hooks personalizados
│   ├── layouts/    # Componentes de diseño
│   ├── pages/      # Componentes de página
│   ├── routes/     # Configuración de rutas
│   ├── services/   # Servicios para API y otras operaciones
│   ├── styles/     # Estilos globales y configuración de Tailwind
│   ├── types/      # Definiciones de tipos de TypeScript
│   ├── utils/      # Funciones de utilidad
│   ├── App.jsx     # Componente principal de la aplicación
│   └── main.jsx    # Punto de entrada
├── .eslintrc.js    # Configuración de ESLint
├── index.html      # Plantilla HTML
├── package.json    # Dependencias y scripts del proyecto
├── tailwind.config.js # Configuración de Tailwind CSS
├── vite.config.js  # Configuración de Vite
└── README.md       # Documentación del proyecto
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
   npm i pnpm
   pnpm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```

4. **Accede a la aplicación:**
   * La aplicación estará disponible en `http://localhost:5173`.

### Scripts Disponibles

* **`pnpm dev`**: Inicia el servidor de desarrollo.
* **`pnpm build`**: Compila la aplicación para producción.
* **`pnpm preview`**: Previsualiza la versión compilada antes de desplegar.
* **`pnpm lint`**: Ejecuta el linter para identificar problemas en el código.

## 🌿 Gestión de Ramas

Al ser un equipo de 4 personas sin roles definidos, seguiremos una estrategia de ramificación (branching) simplificada pero efectiva para colaborar en el proyecto.

### Ramas Principales

- **`main`**: Rama de producción. Contiene el código estable y listo para desplegar.
- **`develop`**: Rama de desarrollo principal. Todas las funcionalidades se integran aquí antes de pasar a `main`.

### Ramas de Trabajo

Para el desarrollo de nuevas funcionalidades, corrección de errores o mejoras, seguiremos la siguiente convención:

- **`feature/nombre-funcionalidad`**: Para nuevas funcionalidades (ej: `feature/login-page`, `feature/developer-profile`).
- **`fix/nombre-error`**: Para corrección de errores (ej: `fix/responsive-layout`).
- **`refactor/nombre-componente`**: Para mejoras de código existente (ej: `refactor/form-components`).

### Flujo de Trabajo

1. **Crear una rama de trabajo**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/mi-nueva-funcionalidad
   ```

2. **Realizar commits frecuentes y descriptivos**:
   ```bash
   git commit -m "Añade componente de formulario de registro"
   ```

3. **Mantener la rama actualizada**:
   ```bash
   git pull origin develop
   ```

4. **Subir cambios a GitHub**:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```

5. **Crear Pull Request**:
   - Desde la rama de trabajo hacia `develop`
   - Asignar al menos un revisor del equipo
   - Incluir descripción clara de los cambios

6. **Integración a main**:
   - Periódicamente, cuando `develop` tenga funcionalidades estables, se creará un PR desde `develop` a `main`
   - Este PR debe ser revisado y aprobado por al menos 2 miembros del equipo

### Convenciones de Commits

Para mantener el historial organizado, utilizaremos la siguiente estructura para los mensajes de commit:

```
[tipo]: descripción corta

Descripción detallada si es necesaria
```

Donde `tipo` puede ser:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios que no afectan el significado del código (espacios, formato, etc.)
- `refactor`: Código que no corrige bugs ni añade funcionalidades
- `test`: Añadir o corregir tests
- `chore`: Cambios en el proceso de build o herramientas auxiliares

Ejemplo:
```
feat: implementa página de perfil de desarrollador

- Añade formulario para datos personales
- Implementa sección de habilidades con etiquetas
- Crea componente para mostrar experiencia laboral
```

## 🔗 Enlaces Útiles

* **Notion:** [Documentación del Proyecto](https://www.notion.so/1ce4f680cf84804ebde5e064376d2da1?v=1ce4f680cf8480ac9ae7000c147e9a86&pvs=4)
* **Trello:** [Tablero de Tareas](https://trello.com/b/SMoorg1M/tfm-fsdstr0225-rojo)
* **GitHub Frontend:** [Repositorio Frontend](https://github.com/FSDSTR0225/TFM-frontend-rojo)
* **GitHub Backend:** [Repositorio Backend](https://github.com/FSDSTR0225/TFM-backend-rojo)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nombre-de-la-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m "Añadir funcionalidad"`).
4. Sube tus cambios (`git push origin feature/nombre-de-la-funcionalidad`).
5. Abre un pull request describiendo tus cambios.

## 📜 Licencia

Este proyecto se considera de uso privado para fines educativos.

## 👥 Autores

Desarrollado por **red-team-0225**

---

🎉 ¡Gracias por visitar este repositorio! Si tienes preguntas o sugerencias, no dudes en [abrir un issue](https://github.com/FSDSTR0225/TFM-frontend-rojo/issues).
