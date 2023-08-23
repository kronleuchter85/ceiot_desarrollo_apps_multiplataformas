//=======[ Settings, Imports & Data ]==========================================



var DISPOSITIVOS_ELECTROVALVULAS_Y_LECTURAS = "select DISTINCT m.DispositivoId id" +
    ", max(m.fecha) lastReadingDate "+
    ", max(m.valor) lastReadingValue "+
    ", d.nombre name "+
    ", d.ubicacion location "+
    ", e.nombre valveName "+
    ", e.ElectrovalvulaId valveId "+
    ", (select r.apertura from DAM.Log_Riegos r where r.ElectrovalvulaId = d.ElectrovalvulaId order by r.fecha desc limit 1) state " +
    "from DAM.Dispositivos d "+
    "join DAM.Mediciones m on m.DispositivoId = d.DispositivoId "+
    "join DAM.Electrovalvulas e on e.ElectrovalvulaId = d.ElectrovalvulaId "+
    "group by m.DispositivoId , d.nombre , d.ubicacion , e.nombre, e.ElectrovalvulaId";

var TODAS_LAS_MEDICIONES = "select medicionId id, valor, fecha, dispositivoId from DAM.Mediciones";
var TODOS_LOS_LOGS_RIEGOS = "select logRiegoId id, fecha, electrovalvulaId, apertura from DAM.Log_Riegos";

var ULTIMA_MEDICION_POR_DISPOSITIVO = "select DISTINCT " +
    "m.medicionId id " +
    ", max(m.fecha) fecha " +
    ", max(m.valor) valor " + 
    ", m.dispositivoId " +
    "from DAM.Mediciones m " +
    "where m.dispositivoId = ? "+
    "group by medicionId , m.dispositivoId " +
    "order by valor desc " +
    "limit 1 ";

var INSERTAR_RIEGO = "insert into DAM.Log_Riegos (electrovalvulaId , apertura , fecha) values (? , ? , ?)";

var INSERTAR_MEDICION = "insert into DAM.Mediciones (dispositivoId, fecha, valor) values (?,?,?)";

var ULTIMO_LOG_RIEGO_BY_DEVICE = "select " +
    " r.apertura, " +
    " r.fecha, "+
    " r.ElectrovalvulaId electrovalvulaId, "+
    " r.logRiegoId id "+
    "from DAM.Log_Riegos r "+
    "join DAM.Dispositivos d on d.ElectrovalvulaId = r.ElectrovalvulaId "+
    "where r.ElectrovalvulaId = ? "+
    "order by fecha DESC "+
    "limit 1 ";


var PORT    = 3000;

const cors = require('cors');
var express = require('express');
var app     = express();
var pool   = require('./mysql-connector');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

// to enable cors
app.use(cors(corsOptions));

//=======[ Main module code ]==================================================


app.get('/api/devices/', function(req, res, next) {
    pool.query(DISPOSITIVOS_ELECTROVALVULAS_Y_LECTURAS, function(err, devices, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        pool.query(TODAS_LAS_MEDICIONES, function(err, mediciones, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }

            pool.query(TODOS_LOS_LOGS_RIEGOS,  function(err, riegos, fields) {
                
                if (err) {
                    res.send(err).status(400);
                    return;
                }

                for( var i=0 ; i<devices.length ; i++){
                    var device = devices[i];
                    var deviceId = device.id;
                    var valveId = device.valveId;

                    var riegosByDevice = riegos.filter(function(r){
                        return r.electrovalvulaId == valveId;
                    });
                
                    var medicionesByDevice = mediciones.filter(function(m){
                        return m.dispositivoId == deviceId;
                    });
                    
                    device['riegos'] = riegosByDevice;
                    device['mediciones'] = medicionesByDevice;

                    if(device['state'] == null)
                        device['state'] = 0;

                }

                res.send(devices);
            });
        });
    });
});

app.get('/api/mediciones/', function(req, res, next) {

    pool.query(TODAS_LAS_MEDICIONES, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

app.get('/api/mediciones/last/:idDevice', function(req, res, next) {
    var idDevice = req.params.idDevice;
    var sqlParams = [idDevice];
    pool.query(ULTIMA_MEDICION_POR_DISPOSITIVO, sqlParams , function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

app.get('/api/riegos/', function(req, res, next) {

    pool.query(TODOS_LOS_LOGS_RIEGOS,  function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});


app.post('/api/mediciones/', function(req, res, next) {

    var dispositivoId = req.body.dispositivoId;
    var fecha = req.body.fecha;
    var valor = req.body.valor;
    var sqlParams = [dispositivoId, fecha,  valor];

    console.log(req.body);

    pool.query(INSERTAR_MEDICION, sqlParams, function(err, result, fields) {
        if (err) {
            console.log(err);
            res.send(err).status(400);
            return;
        }
        console.log(result);
        res.send(result);
    });
});


app.post('/api/riegos/', function(req, res, next) {

    var apertura = req.body.apertura;
    var electrovalvulaId = req.body.electrovalvulaId;
    var fecha = req.body.fecha;
    var sqlParams = [electrovalvulaId, apertura,  fecha];

    console.log(req.body);

    pool.query(INSERTAR_RIEGO, sqlParams, function(err, result, fields) {
        if (err) {
            console.log(err);
            res.send(err).status(400);
            return;
        }
        console.log(result);
        res.send(result);
    });
});


app.get('/api/riegos/last/:idDevice', function(req, res, next) {
    var idDevice = req.params.idDevice;
    var sqlParams = [idDevice];
    pool.query(ULTIMO_LOG_RIEGO_BY_DEVICE, sqlParams , function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
