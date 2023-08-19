//=======[ Settings, Imports & Data ]==========================================



var DISPOSITIVOS_ELECTROVALVULAS_Y_LECTURAS = "select DISTINCT m.DispositivoId id" +
    ", max(m.fecha) lastReadingTime "+
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

var LOG_RIEGOS_BY_VALVE = "select * from DAM.Log_Riegos r where m.electrovalvulaId = ?";

var INSERTAR_RIEGO = "insert into DAM.Log_riegos (ElectrovalvulaId , valor , fecha) values (? , ? , ?)";

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

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

//=======[ Main module code ]==================================================

// app.get('/test', function(req, res, next) {
//     res.send({'mensaje': JSON.stringify(req)}).status(200);
// });

app.get('/devices/', function(req, res, next) {

    pool.query(DISPOSITIVOS_ELECTROVALVULAS_Y_LECTURAS, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

app.get('/readings/:idDevice', function(req, res, next) {

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

app.get('/riegos/:idValvula', function(req, res, next) {

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


app.post('/riegos/', function(req, res, next) {

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
