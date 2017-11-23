
   
    var fs = require('fs');
    var five = require('johnny-five');
    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var angleServo4=0;
    var angleServo3=0;
    var angleServo2=0;
    var angleServo1=0;
    board = new five.Board();

    app.use(express.static(__dirname + '/public'));

    app.use(bodyParser.urlencoded());

    app.get('/', function(req, res, next) {
      res.sendFile(__dirname + '/index.html')
    });

    
    board.on("ready", function() {
        var servo1 = new five.Servo({
            pin:10,
            startAt: 0
        });

        var servo2 = new five.Servo({
            pin:11,
            startAt: 0,
            range: [0,110]
        });

        var servo3 = new five.Servo({
            pin: 8,
            startAt: 0,
            range: [80,120]
        })


        var servo4 = new five.Servo({
            pin: 9,
            startAt: 0,
            range: [0,55]
        })

        // servo1.sweep();
        // servo2.sweep();
        // servo3.sweep();
        // servo4.sweep();

        app.post("/prueba",function(req,res){
            let tipo = req.body.tipo;
            if(tipo=="pinzas"){
                let anglePinzas = req.body.anglePinzas;
                servo4.to(anglePinzas,4000);
            }else if(tipo=="rotate"){
                let rotate = req.body.rotate;
                servo1.to(rotate);
            }else if(tipo=="leftUp"){
                let leftUp = req.body.leftUp;
                servo2.to(leftUp);
            }else if(tipo=="rightUp"){
                let rightUp = req.body.rightUp;
                servo3.to(rightUp,4000);
            }
            
        });
    });


    app.listen(8083, "0.0.0.0");

    