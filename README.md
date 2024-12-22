# Proyecto con Next.js y API en Java Spring Boot

Este proyecto consiste en una aplicación web construida con **Next.js** para el frontend y una API desarrollada en **Java Spring Boot** para el backend. 

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```
.
├── api/         # Código del backend (Java Spring Boot)
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── ...      # Otros archivos y carpetas de la API
└── src/         # Código del frontend (Next.js)
    ├── package.json
    └── ...      # Otros archivos y carpetas del frontend
```

---

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Docker](https://www.docker.com/) y Docker Compose.
- [Node.js](https://nodejs.org/) (si deseas ejecutar el frontend sin Docker).
- JDK 17 o superior (si deseas ejecutar el backend sin Docker).

---

## Configuración y Ejecución

### 1. Ejecución con Docker

#### Backend (API - Java Spring Boot)

1. Navega al directorio `api/`:
   ```bash
   cd api
   ```
2. Construye la imagen Docker de la API:
   ```bash
   docker build -t api_truek .
   ```
3. Levanta el contenedor usando Docker Compose:
   ```bash
   docker-compose up
   ```
4. La API estará disponible en `http://localhost:8081`.

#### Frontend (Next.js)

1. Navega al directorio `src/`:
   ```bash
   cd src
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta la aplicación en modo de desarrollo:
   ```bash
   npm run dev
   ```
4. El frontend estará disponible en `http://localhost:3000`.

---

## Notas Adicionales

- Asegúrate de que las configuraciones de red entre los contenedores de Docker estén correctamente configuradas para que el frontend pueda comunicarse con la API.
- Puedes personalizar las variables de entorno editando los archivos `.env` en los respectivos directorios.

---