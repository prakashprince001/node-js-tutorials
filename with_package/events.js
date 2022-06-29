var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('speak', function(name) {
    console.log(name , 'is speaking.');
});

eventEmitter.emit('speak', 'Prakash');