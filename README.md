# 🐾 Huellitas Felices — API REST y gestión de productos

Proyecto académico individual para las evidencias **GA7-220501096-AA5-EV02 (API)** y **GA7-220501096-AA5-EV01 (Diseño y desarrollo de servicios web – caso)** del SENA, según las instrucciones de la sesión del 18/11/2026.

## Funcionalidades
- Registro de usuarios con contraseñas cifradas (bcrypt).
- Inicio de sesión con JWT que expira en 2 horas.
- API REST protegida con encabezado `Authorization: Bearer TOKEN`.
- CRUD de productos (crear, consultar, actualizar, eliminar).
- Cada usuario solo ve y modifica sus propios productos.
- Validaciones de correo, contraseña, precios, existencias y datos obligatorios.
- Interfaz web responsiva.
- Base de datos SQLite gestionada con Prisma.

## Requisitos
- Node.js **22 o superior**, npm y Visual Studio Code (opcional).

## Instalación (PowerShell de Windows)
1. Descomprime el archivo ZIP y abre la carpeta `huellitas-felices` en Visual Studio Code.
2. Abre una terminal dentro de esa carpeta (donde está `package.json`).
3. Ejecuta:

```powershell
npm.cmd install
Copy-Item .env.example .env
```

4. Abre `.env` y reemplaza `JWT_SECRET` por una clave privada larga y aleatoria de al menos 32 caracteres. **No publiques este archivo.**
5. Crea la base de datos y ejecuta el proyecto:

```powershell
npm.cmd run db:setup
npm.cmd run dev
```

6. Abre **http://localhost:3000** y registra una cuenta propia. No hay credenciales predefinidas.

## Endpoints de la API

| Método | Ruta | Descripción | Requiere JWT |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesión y obtener token | No |
| GET | `/api/products` | Listar mis productos | Sí |
| POST | `/api/products` | Crear producto | Sí |
| GET | `/api/products/1` | Consultar producto por ID | Sí |
| PUT | `/api/products/1` | Actualizar producto | Sí |
| DELETE | `/api/products/1` | Eliminar producto | Sí |

### Ejemplo: registrar usuario
```json
{"name":"Aprendiz SENA","email":"aprendiz@ejemplo.com","password":"ClaveSegura123"}
```
### Ejemplo: iniciar sesión
```json
{"email":"aprendiz@ejemplo.com","password":"ClaveSegura123"}
```
La respuesta incluye `token`; cópialo en `Authorization: Bearer <token>` para usar los endpoints de productos con Postman, Insomnia o PowerShell.

### Ejemplo: crear producto
```json
{"name":"Collar para perro","category":"Accesorios","price":25000,"stock":10,"description":"Collar ajustable"}
```

## Pruebas sugeridas
1. Registrar un usuario: debe devolver HTTP 201.
2. Intentar registrarlo otra vez: HTTP 409.
3. Iniciar sesión con contraseña errónea: HTTP 401.
4. Iniciar sesión correctamente: debe devolver un JWT.
5. Consultar productos sin token: HTTP 401.
6. Crear un producto con token: HTTP 201.
7. Consultarlo, editarlo y eliminarlo con el mismo usuario.
8. Intentar registrar un producto con precio negativo: HTTP 400.
9. Verificar que otra cuenta no pueda ver ni modificar productos ajenos.

## Evidencias para presentar
- **EV02 (API):** rutas REST, CRUD, base de datos, validaciones, token y capturas de pruebas.
- **EV01 (servicios web – caso):** registro, autenticación, validación, interfaz y capturas del funcionamiento.
- En ambas evidencias puede indicarse el mismo repositorio, **si el instructor acepta una implementación conjunta**.

## Estructura
- `app/page.tsx`: interfaz.
- `app/api/auth/`: registro y login.
- `app/api/products/`: endpoints CRUD.
- `lib/`: autenticación, Prisma y validaciones.
- `prisma/schema.prisma`: modelos de base de datos.

## Seguridad
Las contraseñas se guardan con hash; no se incluyen cuentas reales ni secretos en el repositorio. SQLite local es adecuada para demostración académica, no para despliegue serverless sin almacenamiento persistente.
