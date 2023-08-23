# Universidad de Buenos Aires - Especializacion en Internet de las Cosas
## Asignatura Desarrollo de Aplicaciones Multiplataforma
## Trabajo Practico integrador
### Alumno Gonzalo Carreno
========================================

Pasos para ejecutar el proyecto

1) Ejecutar el comando npm install 
2) Levantar el proyecto mediante docker-compose up: Esto deberia crear el contenedor con la aplicacion instalando las dependencias necesarias. 
3) Ejecutar los scrpits de carga estructuras y datos provistos en el directorio "db" mediante la interfaz web de MySQL publicada en http://localhost:8001 
4) Acceder al frontend en http://localhost:8100 y ejecutar la aplicacion.

Notas del disenio del sistema:
=========================================

Componentes:
 - Directiva showReading: es una directiva custom que permite renderizar la ultima lectura en el componente grafico
 - Pipe formatDate: es un pipe custom que permite formatear un objeto date/datetime en un formato agradable para el usuario
 - Service listadoService: implementa la comunicacion con el backend y entre los componentes graficos mediante Observables.
 - Componentes:
    - Detalle-Sensor: abstrae el componente grafico donde se renderizan las lecturas
    - Listado: es el componente principal del listado de dispositivos, mediciones y riegos implementado con Ionic Accordions
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

Sobre las funcionalidades
==============================================
Las funcionalidades provistas son:
- Listado de los dispositivos
- Permitir ver mediciones y registros de riego por dispositivo
- Renderizar la ultima lectura en el componente grafico
- Permitir abrir y cerrar la electrovalvula del dispositivo
    - insertando un nuevo registro de riego del evento
    - en caso de que se este cerrando la electrovalvula ademas insertar una nueva medicion

Consideraciones para el cumplimiento de los requerimientos
==========================================================
- Dentro de la informacion brindada para cada dispositivo listado se agrega el estado de su electrovalvula, pudiendo ser 0 (cerrado) o 1 (abierto). De esta forma se simplifica la gestion de la apertura y cierre, asi como la determinacion si insertar o no una nueva medicion.
- Debido a que la carga inicial de datos presenta varios riegos y mediciones con el mismo timestamp se toma como decision de disenio para la query SQL que busca los dispositivos con la ultima lectura, considerar la ultima y ademas la mayor en valor nominal.


Algunas capturas de pantalla del producto terminado:
===================================================
![alt text](./doc/images/img1.png)
![alt text](./doc/images/img2.png)
![alt text](./doc/images/img3.png)