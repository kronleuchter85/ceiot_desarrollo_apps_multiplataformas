//=======[ Settings, Imports & Data ]==========================================



var DISPOSITIVOS_ELECTROVALVULAS_Y_LECTURAS = "select DISTINCT m.DispositivoId id" +
    ", max(m.fecha) lastReadingDate "+
    ", max(m.valor) lastReadingValue "+
    ", d.nombre name "+
    ", d.ubicacion location "+
    ", e.nombre valveName "+
    ", e.ElectrovalvulaId valveId "+
    "from DAM.Dispositivos d "+
    "join DAM.Mediciones m on m.DispositivoId = d.DispositivoId "+
    "join DAM.Electrovalvulas e on e.ElectrovalvulaId = d.ElectrovalvulaId "+
    "group by m.DispositivoId , d.nombre , d.ubicacion , e.nombre, e.ElectrovalvulaId";

var TODAS_LAS_MEDICIONES_BY_DEVICE = "select * from DAM.Mediciones m where m.dispositivoId = ?";
var TODAS_LAS_MEDICIONES = "select * from DAM.Mediciones";
var TODOS_LOS_LOGS_RIEGOS = "select * from DAM.Log_Riegos";

var LOG_RIEGOS_BY_VALVE = "select * from DAM.Log_Riegos r where m.electrovalvulaId = ?";

var INSERTAR_RIEGO = "insert into DAM.Log_Riegos (ElectrovalvulaId , valor , fecha) values (? , ? , ?)";

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
                    var valveId = device.electrovalvulaId;

                    var riegosByDevice = riegos.filter(function(r){
                        return r.electrovalvulaId == valveId;
                    });
                
                    var medicionesByDevice = mediciones.filter(function(m){
                        return m.dispositivoId == deviceId;
                    });
                    
                    device['riegos'] = riegosByDevice;
                    device['mediciones'] = medicionesByDevice;
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


app.get('/api/mediciones/:idDevice', function(req, res, next) {

    var idDevice = req.params.idDevice;
    var sqlParams = [idDevice];

    pool.query(TODAS_LAS_MEDICIONES_BY_DEVICE, sqlParams, function(err, result, fields) {
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


app.get('/api/riegos/:idValvula', function(req, res, next) {

    var idValvula = req.params.idValvula;
    var sqlParams = [idValvula];

    pool.query(TODAS_LAS_MEDICIONES_BY_DEVICE, sqlParams, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});


app.post('/api/riegos/', function(req, res, next) {

    var apertura = req.body.apertura;
    var electrovalvulaId = req.body.electrovalvulaId;
    var fecha = req.body.fecha;
    var sqlParams = [apertura, electrovalvulaId,  fecha];

    pool.query(INSERTAR_RIEGO, sqlParams, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

// app.get('/devices/', function(req, res, next) {
//     pool.query('Select * from Dispositivos', function(err, result, fields) {
//         if (err) {
//             res.send(err).status(400);
//             return;
//         }
//         res.send(result);
//     });
// });



app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
