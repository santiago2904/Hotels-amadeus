# Servicio de Disponibilidad de Hoteles Amadeus 🏨

## Descripción
Servicio que se integra con la API de Amadeus para consultar la disponibilidad de hoteles. Proporciona la información en formato JSON y Excel.


## Ejemplo desplegado
- hotels-amadeus-production.up.railway.app/hotels/availability?cityCode=BOG&checkInDate=2024-11-24&checkOutDate=2024-11-25&guests=2&roomQuantity=1
- hotels-amadeus-production.up.railway.app/hotels/availability/excel?cityCode=BOG&checkInDate=2024-11-24&checkOutDate=2024-11-25&guests=2&roomQuantity=1

## ✨ Funcionalidades
- Consulta de disponibilidad de hoteles en tiempo real
- Respuestas en formato JSON y Excel
- Documentación con Swagger
- Pruebas automatizadas

## 📋 Requisitos
- Node.js (v20)
- NPM
- Credenciales de API de Amadeus

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/santiago2904/Hotels-amadeus.git
cd Hotels-amadeus
git checkout master
```

2. Instala dependencias:
```bash
npm install
```

3. Crea un archivo `.env` con tus credenciales (a modo de ejemplo se exponen las credenciales de testeo):
```bash
AMADEUS_API_KEY=zAxmiZZVOfazysQ4U71eGhArgSAQE5x7
AMADEUS_API_SECRET=am0O4hkcd5beejDa
```


3. Ejecuta la api:
```bash
npm run start
```

## 📚 Documentación API

Accede a la documentación detallada en:
```
http://localhost:3000/docs/
```

### Endpoints Disponibles

#### 1. Consultar Hoteles (JSON)
```http
GET /hotels/availability
ejemplo: http://localhost:3000/hotels/availability?cityCode=BOG&checkInDate=2024-11-24&checkOutDate=2024-11-25&guests=2&roomQuantity=1
```

**Headers necesarios**
- `api-key`: Tu clave de autenticación

**Parámetros**
- `cityCode`: Código IATA de la ciudad
- `checkInDate`: Fecha de entrada (YYYY-MM-DD)
- `checkOutDate`: Fecha de salida (YYYY-MM-DD)
- `guests`: Número de huéspedes
- `roomQuantity`: Número de habitaciones

#### 2. Consultar Hoteles (Excel)
```http
GET /hotels/availability/excel
ejemplo: http://localhost:3000/hotels/availability/excel?cityCode=BOG&checkInDate=2024-11-24&checkOutDate=2024-11-25&guests=2&roomQuantity=1
```
Utiliza los mismos parámetros que la versión JSON.

## ⚡ Pruebas

Ejecutar pruebas:
```bash
npm test
```

## ⚠️ Notas Importantes
- La API tiene límites de consultas. Se recomienda implementar caché
- No compartir las credenciales de API
- Usar siempre variables de entorno para los datos sensibles

---


