var five = require("johnny-five");
var myBoard;

myBoard = new five.Board();

myBoard.on("ready", function() {
    var servo = new five.Servo(8);
    servo.sweep();
});