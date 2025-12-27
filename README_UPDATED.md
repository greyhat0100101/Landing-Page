# Modern Futuristic Platform - Zentrix (MEJORADA)

Este es una versión **mejorada** del landing page futurista con **Sistema de Tracking de Visitantes integrado**. La app registra automáticamente cada visitante con su país y tipo de dispositivo en MongoDB.

## 🆕 Nuevas Características

✅ **Sistema de Tracking de Visitantes**
- Registra automáticamente cada visitante que entra al landing page
- Captura: País, Ciudad, Tipo de Dispositivo, Navegador y Sistema Operativo
- Datos almacenados en la base de datos MongoDB `landPage`
- Detección de geolocalización en tiempo real
- Análisis de User Agent para información del dispositivo/navegador

## 📁 Estructura del Proyecto

```
zentrix-platform/
├── package.json        # Dependencias (MongoDB, dotenv, geoip, ua-parser)
├── server.js           # Express server con endpoints de tracking
├── .env                # Variables de entorno (PORT, MONGO_URI)
├── README.md           # Documentación original
└── public/
    ├── index.html      # Landing page futurista
    ├── css/
    │   └── style.css   # Estilos
    └── js/
        └── main.js     # Babylon.js + logging de visitantes
```

## 🚀 Cómo Ejecutar

1. Instala [Node.js](https://nodejs.org/)
2. Instala dependencias:
   ```bash
   npm install
   ```
3. El archivo `.env` ya está configurado con tu MongoDB
4. Inicia el servidor:
   ```bash
   npm start
   ```
   o para desarrollo:
   ```bash
   npm run dev
   ```
5. Abre http://localhost:3000

## 📊 Endpoints API

### POST `/api/log-visitor`
Registra un nuevo visitante (se llama automáticamente al cargar la página).

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "country": "MX",
    "device": "mobile"
  }
}
```

### GET `/api/visitor-stats`
Obtiene estadísticas de visitantes agregadas por país.

**Respuesta:**
```json
{
  "success": true,
  "stats": [
    {
      "_id": "MX",
      "count": 42,
      "devices": ["mobile", "desktop", "mobile", ...]
    },
    {
      "_id": "US",
      "count": 28,
      "devices": ["desktop", "tablet", ...]
    }
  ]
}
```

## 🗄️ Configuración de MongoDB

La app usa MongoDB con la siguiente estructura:

- **Base de datos:** `landPage`
- **Colección:** `visitoLogs`
- **Campos guardados:**
  - `ip`: Dirección IP del visitante
  - `country`: Código del país (ej: MX, US, ES)
  - `city`: Nombre de la ciudad
  - `device`: Tipo de dispositivo (mobile, desktop, tablet)
  - `browser`: Navegador (Chrome, Firefox, Safari, etc)
  - `os`: Sistema operativo (Windows, iOS, Android, etc)
  - `timestamp`: Fecha y hora de la visita

## 📝 Qué Se Mejoró

### Backend (server.js)
- ✅ Conexión a MongoDB con mongoose
- ✅ Modelo de datos para visitantes
- ✅ Middleware para capturar IP del cliente
- ✅ Detección de país usando `geoip-lite`
- ✅ Análisis de navegador/dispositivo con `ua-parser-js`
- ✅ Endpoint POST para guardar logs
- ✅ Endpoint GET para estadísticas

### Frontend (public/js/main.js)
- ✅ Función `logVisitor()` que envía datos al servidor
- ✅ Se ejecuta automáticamente al cargar la página
- ✅ Logging de éxito en consola

### Dependencias (package.json)
```json
{
  "mongoose": "^7.5.0",    // ODM para MongoDB
  "dotenv": "^16.3.1",     // Manejo de variables de entorno
  "ua-parser-js": "^1.0.37", // Parsing de User Agent
  "geoip-lite": "^1.4.7"   // Geolocalización por IP
}
```

## 🔐 Variables de Entorno (.env)

```
PORT=3000
MONGO_URI=mongodb+srv://Jorge:1234@atlascluster.ww6k8tb.mongodb.net/landPage
```

## 📈 Próximas Mejoras Sugeridas

1. Agregar dashboard para visualizar estadísticas
2. Gráficos de visitantes por país y dispositivo
3. Filtros por rango de fechas
4. Exportar datos a CSV
5. Alertas de visitantes en tiempo real
6. Rate limiting para proteger la API
7. Caché de geolocalización para mayor velocidad

## 📄 Licencia

Proyecto de Zentrix Platform. Libre para usar y modificar.
