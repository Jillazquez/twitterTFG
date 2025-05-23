
# Callio

Callio es una red social desarrollada con **React** en el frontend y **Node.js** con **Express** en el backend, utilizando **MongoDB** y **Mongoose** para la base de datos. Además, el proyecto utiliza **Jenkins** para la integración y despliegue continuo.

---

## Tecnologías

- Frontend: React
- Backend: Node.js, Express
- Base de datos: MongoDB con Mongoose
- CI/CD: Jenkins

---

## Instalación y arranque

### Requisitos previos

- Node.js (versión recomendada: 16.x o superior)
- MongoDB en funcionamiento (local o remoto)
- Jenkins (opcional para integración continua)
- npm o yarn

### Clonar el repositorio

```bash
git clone https://github.com/Jillazquez/twitterTFG.git
cd twitterTFG
```

---

### Backend

1. Ir a la carpeta del backend

```bash
cd back
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

Crear un archivo `.env` con las variables necesarias para la conexión a MongoDB y otros parámetros del backend.

Ejemplo `.env`:

```
MONGO_URI=mongodb://localhost:27017/twitterTFG
PORT=5000
JWT_SECRET=tu_secreto
```

4. Arrancar la aplicación

```bash
npm start
```

El servidor backend se ejecutará en el puerto especificado en `.env` (por defecto 5000).

---

### Frontend

1. Ir a la carpeta del frontend

```bash
cd frontend
```

2. Instalar dependencias

```bash
npm install
```

3. Arrancar la aplicación en modo desarrollo

```bash
npm run dev
```

El frontend se ejecutará usualmente en `http://localhost:5173`.

---

## Uso

- Accede a `http://localhost:5173` para usar la red social.
- El backend estará escuchando en el puerto configurado (por defecto 5000).

---

## Jenkins

Para la integración y despliegue continuo, se utiliza Jenkins. Configura el pipeline para ejecutar:

- `npm install` y `npm start` en el backend
- `npm install` y `npm run dev` en el frontend

Ajusta la configuración según tus necesidades para tests y despliegues.

## Licencia

[MIT](LICENSE)
