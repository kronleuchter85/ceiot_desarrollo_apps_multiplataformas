//=======[ Settings, Imports & Data ]==========================================



var DISPOSITIVOS_ELECTROVALVULAS_Y_LECTURAS = "select DISTINCT m.DispositivoId " +
    ", max(m.fecha) "+
    ", max(m.valor) lastReading "+
    ", d.nombre dispositivo "+
    ", d.ubicacion "+
    ", e.nombre ElectrovalvulaId "+
    ", e.ElectrovalvulaId "+
    "from DAM.Dispositivos d "+
    "join DAM.Mediciones m on m.DispositivoId = d.DispositivoId "+
    "join DAM.Electrovalvulas e on e.ElectrovalvulaId = d.ElectrovalvulaId "+
    "group by m.DispositivoId , d.nombre , d.ubicacion , e.nombre, e.ElectrovalvulaId";


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

app.get('/', function(req, res, next) {
    res.send({'mensaje': 'Hola DAM'}).status(200);
});

app.get('/devices/', function(req, res, next) {



    pool.query(DISPOSITIVOS_ELECTROVALVULAS_Y_LECTURAS, function(err, result, fields) {
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
