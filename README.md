# Universidad de Buenos Aires - Especializacion en Internet de las Cosas
# Asignatura Desarrollo de Aplicaciones Multiplataforma
# Trabajo Practico integrador
## Alumno Gonzalo Carreno
========================================

Pasos para ejecutar el proyecto

1) Ejecutar el comando npm install 

2) Levantar el proyecto mediante docker-compose up: Esto deberia crear el contenedor con la aplicacion instalando las dependencias necesarias. 
3) Ejecutar los scrpits de carga estructuras y datos mediante la interfaz web de MySQL publicada en http://localhost:8001 

4) Acceder al frontend en http://localhost:8100 y ejecutar la aplicacion.

Notas del disenio del sistema:
=========================================

Componentes:
 - Directiva showReading
 - Pipe formatDate
 - Service listadoService
 - Componentes:
    - Detalle-Sensor
    - Listado
- Interfaces
    - Dispositivo
    - Medicion
    - Riego

APIs provistas en Express:
- GET /api/devices/
- GET /api/mediciones/
- GET /api/mediciones/last/<idDevice>
- GET /api/riegos/
- GET /api/riegos/last/<idDevice>
- POST /api/mediciones/
- POST /api/riegos/

