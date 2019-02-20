var reconnectTimeout = 2000;
//var host="ee-estott-octo.ee.ic.ac.uk";
var host="broker.hivemq.com";

var port=8000;

//defining callbacks

function onConnected() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("Connected ");
	var topic = "IC.embedded/We.OG/return"; //+replaces anything
	var subOptions = {
		qos: 2,
		onSuccess: onSubscribe
	};
	console.log("Subscribing to " + topic);
	client.subscribe(topic, subOptions);

}

function onSubscribe() {
	console.log("Now subscribed and will begin receiving messages");
	request_from_device([{"number": 243}]);
}

function onMessageArrived(msg) {
	//var deviceData = JSON.parse(msg.payloadString);
	console.log("received " + msg.payloadString)
	//set global var to deviceData
	//save data using cloud
}

function onMessageDelivered(msg) {
	console.log("Sent message \"" + msg.payloadString + "\" to " + msg.destinationName )
}

function onConnectionLost() {
	console.log("Connection was lost")
}


var client = new Paho.MQTT.Client(host, port, "/ws");
//Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.onMessageDelivered = onMessageDelivered;
client.onConnected = onConnected;
var connectOptions = {
	timeout: 3,
	reconnect: false
};

//The meaty functions
function request_from_device(jsonObj) {
	//contains line, number, station
	var d = new Date();
	var time = Math.round(d.getTime() / 1000);
	jsonObj.forEach(train => {

		train.time = time;
		train.number = 243;
		payload = JSON.stringify(train);
		message = new Paho.MQTT.Message(payload);
		topic = "IC.embedded/We.OG/" + train.number.toString();
		message.destinationName = topic;
		console.log("got to here");
		client.send(message);
	});
	//message.destinationName = "sensor1";
	//mqtt.send(message);

}

console.log("connecting to "+ host +":"+ port + "...");
client.connect(connectOptions); //connect




