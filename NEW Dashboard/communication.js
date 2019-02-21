//This file contains all the async functions needed for communication with external APIs and devices.
//initialises client as an mqttclient


//var reconnectTimeout = 2000;
//var host="ee-estott-octo.ee.ic.ac.uk";
var host="broker.hivemq.com"; //transferred

var port=8000;

//defining callbacks for mqtt

function onConnected() {
	//Subscribe after connecting
	console.log("Connected ");
	var topic = "IC.embedded/We.OG/return"; 
	var subOptions = {
		qos: 2,
		onSuccess: onSubscribe
	};
	console.log("Subscribing to " + topic);
	client.subscribe(topic, subOptions);
}

function onSubscribe() {
	console.log("Now subscribed and will begin receiving messages");
	isConnectedAndSubbed = true; //flag used in import.js
}

function onMessageArrived(msg) {
	var deviceData = JSON.parse(msg.payloadString);
	//console.log("received " + msg.payloadString);
	console.log("received data from  device " + deviceData.number);
	var dataIdx = data.findIndex((x) => x.station === deviceData.station);
	//if doesn't exist in data
	if (dataIdx == -1) {
		data.push(deviceData);
	} else {
		data[dataIdx] = deviceData;
	}
	storeJSON(data);
	//set global var to deviceData
	//save data using cloud
}

function onMessageDelivered(msg) {
	//console.log("Sent message \"" + msg.payloadString + "\" to " + msg.destinationName )
}

function onConnectionLost() {
	console.log("Connection was lost")
}



//Communicating with devices
function requestFromDevice(train) {
	//This function requests for the sensor data at a specific time from the device
	//jsonObj should contain line, number, station
	var d = new Date();
	var time = Math.round(d.getTime() / 1000);
	train.time = time;
	//train.number = 243;
	//console.dir(train);
	payload = JSON.stringify(train);
	message = new Paho.MQTT.Message(payload);
	//console.log("train.number is: "+ train.number); //tra
	topic = "IC.embedded/We.OG/request/" + train.number.toString(); //train.number is in fact a string already
	message.destinationName = topic;
	console.log("Requesting Data from device " + train.number);
	client.send(message);
}

//Communicating with TFL API
function requestLineArrivalInfo(line) { //line must be lower case
	return new Promise(function (resolve,reject) {
		// define variable for API request
		var request = new XMLHttpRequest();
		//opening new connection
		var url = "https://api.tfl.gov.uk/line/" + line + "/arrivals";
		request.open(
		  "GET",
		  url,
		  true
		);
		request.onload = function () {
			if (this.status >= 200 && this.status < 300) {
			  // accessing JSON data
			  var api_data = JSON.parse(this.response);
			  var out_json = [];
			  var checkedIds = [0];
			  //for loop for each item in api
			  api_data.forEach(train => {
			    //check if a train is at a station for all data entries
			    if (train.currentLocation.substring(0, 2) == "At") {
			      //check if the train number is an the array
			      if(!checkedIds.includes(train.vehicleId)){
			        //create an object with vehicle number and station
			        var useful_data = {
			          line: train.lineName,
			          number: train.vehicleId,
			          station: train.currentLocation.substring(3,train.currentLocation.length - 11)
			        };
			        //add vehicle Id number to the array
			        checkedIds.push(train.vehicleId);
			        //concatenate into a JSON
			        out_json = out_json.concat(useful_data);
			        // to display:
			      }
			    }
			  });
			  //display
			  resolve(out_json); //the handler for this the successful API call will receive the processed data
			  //document.write(out_json); // must be changed
			} else {
		    reject({
		        status: this.status,
		        statusText: this.statusText
		    });
			}
		};

		request.onerror = function () {
			reject({
			    status: this.status,
			    statusText: this.statusText
			});
		};
		// Send request
		request.send();
	});
}

//Communicating with the KVaas storage for JSON
var urlWithToken = "https://api.keyvalue.xyz/8a59a1a7/Iotube"; //global var
var key = "Iotube";

//setupSTorage has already been called to attain the key and token
//no need to call during website load
function setupStorage() {
	return new Promise(function(resolve, reject) {
		var request1 = new XMLHttpRequest();
		var url = "https://api.keyvalue.xyz/new/" + key;
		request1.open("POST", url, true);
		//console.log("tokenurl is " + tokenurl);
      //      console.log("type is " + typeof tokenurl);
    request1.onload = function() {
    	if (this.status >= 200 && this.status < 300) {
			  // accessing JSON data
			  console.log("url with token is " + this.response);
			  urlWithToken = this.response;
			  resolve(urlWithToken);
			} else {
		    reject({
		        status: this.status,
		        statusText: this.statusText
		    });
			}
		};
		request1.onerror = function () {
			reject({
			    status: this.status,
			    statusText: this.statusText
			});
		};
		request1.send(); //output is a url with new replaced with token val

	});
}

function storeJSON(jsonObj) {
	//stores JSON in cloud storage
	return new Promise(function(resolve, reject) {
		var request2 = new XMLHttpRequest();
		var url = urlWithToken + "/" + JSON.stringify(jsonObj);
		request2.open("POST", url ,true);
		request2.onload = function() {
    	if (this.status >= 200 && this.status < 300) {
    		console.log("data successfully saved to cloud, data is:");
    		console.dir(jsonObj);
    		resolve();
			} else {
				reject();
			}
		}
		request2.onerror = function () {
			reject({
			    status: this.status,
			    statusText: this.statusText
			});
		};
		request2.send();
	});
}

function retrieveJSON() {
	//retrieves json from cloud storage
	return new Promise(function(resolve, reject) {
		var request3 = new XMLHttpRequest();
		request3.open("GET", urlWithToken, true); //gets the value
		request3.onload = function() {
			if (this.status >= 200 && this.status < 300) {
				var storedVal = JSON.parse(this.response);
    		console.log("data successfully retrieved");
    		console.log("stored value was:");
    		console.dir(storedVal);
    		resolve(storedVal);
			} else {
				reject();
			}
		}
		request3.onerror = function () {
			reject({
			    status: this.status,
			    statusText: this.statusText
			});
		};
		request3.send();
	});
}