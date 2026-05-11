# GreenBite - Frontend

Frontend de la plataforma GreenBite, una plataforma de suscripción de alimentos sustentables.

## Descripción

Este es el frontend de GreenBite, hecho con React + TypeScript + Vite. La aplicación permite a los usuarios:

- **Inicio:** Visualizar productos destacados
- **Productos:** Explorar el catálogo completo de productos con filtros y búsqueda
- **Carrito:** Agregar y gestionar productos en el carrito de compras
- **Autenticación:** Iniciar sesión y registrarse

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx      # Barra de navegación
│   ├── Footer.tsx      # Pie de página
│   ├── Layout.tsx      # Layout principal
│   ├── ProductoCard.tsx # Tarjeta de producto
│   └── modals/         # Modales (Login, Registro, Carrito)
├── pages/              # Páginas principales
│   ├── Home.tsx        # Página de inicio
│   └── Productos.tsx   # Página de productos
├── context/            # Context API para estado global
│   ├── AuthProvider.tsx     # Contexto de autenticación
│   └── CarritoProvider.tsx  # Contexto del carrito
├── interfaces/         # Interfaces TypeScript
├── utils/              # Funciones utilitarias
│   └── api.ts         # Llamadas a la API del BFF
├── App.tsx            # Componente raíz
└── main.tsx           # Punto de entrada
```
## Desarrollo

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## Pruebas

Ejecutar las pruebas:

```bash
npm run test
```

Generar reporte de cobertura:

```bash
npm run coverage
```

## Dependencias Principales

- **React 19:** Librería de UI
- **React Router:** Enrutamiento
- **Bootstrap 5:** Framework CSS
- **TypeScript:** Tipado estático
- **Vite:** Herramienta de construcción rápida
El frontend se conecta con el **BFF (Backend For Frontend)** a través de la API definida en `src/utils/api.ts`.


**Desarrollado para:** Evaluación Parcial N°2 - Desarrollo Fullstack III
