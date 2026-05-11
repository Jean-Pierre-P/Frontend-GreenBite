# GreenBite - Frontend

Frontend de la plataforma GreenBite, una plataforma de suscripción de alimentos sustentables.

## Descripción

Este es el componente frontend de GreenBite, desarrollado con React + TypeScript + Vite. La aplicación permite a los usuarios:

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

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Fronted
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` en la raíz del proyecto:
   ```
   VITE_API_URL=http://localhost:3000
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

## Conexión con el Backend

El frontend se conecta con el **BFF (Backend For Frontend)** a través de la API definida en `src/utils/api.ts`.

### Endpoints esperados del BFF:

- `GET /api/productos` - Obtener lista de productos
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/registro` - Registrar nuevo usuario
- `POST /api/carrito/agregar` - Agregar producto al carrito
- `GET /api/carrito` - Obtener carrito del usuario

## Características Implementadas

✅ Página de Inicio con productos destacados
✅ Catálogo de Productos con filtros y búsqueda
✅ Carrito de Compras funcional
✅ Modales de Login y Registro
✅ Autenticación con Context API
✅ Sincronización de estado con localStorage
✅ Responsive Design con Bootstrap

## Características Futuras

- Página de Perfil de Usuario
- Historial de Pedidos
- Sistema de Recomendaciones (GreenPoints)
- Integración con pasarela de pagos
- Notificaciones en tiempo real

## Licencia

Proyecto académico - DuocUC 2025

---

**Desarrollado para:** Evaluación Parcial N°2 - Desarrollo Fullstack III
