/**
 * Created by chen on 2017/6/12.
 */

var dgram = require('dgram');
var message = new Buffer("我是");
var client = dgram.createSocket("udp4");
client.send(message,0,message.length, 41234, "localhost", function (err, bytes) {
    client.close();
});

