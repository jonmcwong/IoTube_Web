// TEST data 

var data  = []

//Identify which line we are filtering
var identify = document.getElementById('tag').textContent;


//initialise mqtt client
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
var isConnectedAndSubbed = false;
console.log("connecting to "+ host +":"+ port + "...");
client.connect(connectOptions); //connect       

//setup the page
setupWebpage(); //mqtt connection and storage setup are both done in parrellel


//setup call for webpage
async function setupWebpage(){
  //await setupStorage(); //add back in when storage functions defined
  data = await retrieveJSON(); // must always be in sync
  var table = buildtable();
  //Output table
  document.getElementById('output').innerHTML = table;
  setInterval(refresh, 2000);
}

//refreshing the table
async function refresh() {
  document.getElementById('output').innerHTML = buildtable();
  console.log("refresh");
  //returns array of trains currently at stations
  var request = requestLineArrivalInfo(identify.toLowerCase()); 
  //request data from every single one of those trains that are at stations
  request.then((trainsJSON) => {
    trainsJSON.forEach(function(train) {
      //sends requests to each stationed train on its unique device topic
      requestFromDevice(train);
    });
  });
}


// Build HTML table
function buildtable() {
    // Save Data
    var datacurrent = data;

    // Create table and colour elements
    var table = "";
    var color1 = "";
    var color2 = "";
    var color3 = "";
	table += '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">';
    table += '<thead><tr><th><center>STATION</center></th><th><center>Temperature (°C)</center></th><th><center>C02 (ppm)</center></th><th><center>VTOC (ppm)</center></th></tr></thead>'
	for (i = datacurrent.length - 1; i >= 0; i--) {
        if(datacurrent[i].line === identify) {

        // Set colours based on temperature range
            if((Number(datacurrent[i].temperature)) < 11) {
                color1 = "#4FC3F7";
            } else if ((Number(datacurrent[i].temperature)) > 10 && Number(datacurrent[i].temperature) < 20) {
                color1 = "#4DD0E1";
            } else if ((Number(datacurrent[i].temperature)) > 19 && Number(datacurrent[i].temperature) < 26) {
                color1 = "#81C784";
            } else if ((Number(datacurrent[i].temperature)) > 25 && Number(datacurrent[i].temperature) < 30) {
                color1 = "#FFB74D";
            } else if ((Number(datacurrent[i].temperature)) > 29) {
                color1 = "#FF8A65";
            }   
        
        // Set colour based on c02 range
            if((Number(datacurrent[i].temperature)) < 351) {
                color2 = "#81C784";
            } else if ((Number(datacurrent[i].temperature)) > 350 && Number(datacurrent[i].temperature) < 601) {
                color2 = "#AED581";
            } else if ((Number(datacurrent[i].temperature)) > 600 && Number(datacurrent[i].temperature) < 1001) {
                color2 = "#DCE775";
            } else if ((Number(datacurrent[i].temperature)) > 1000 && Number(datacurrent[i].temperature) < 2001) {
                color2 = "#FFB74D";
            } else if ((Number(datacurrent[i].temperature)) > 2000) {
                color2 = "#FF8A65";
            }

            // Set colour based on VolatileComponents range
            if((Number(datacurrent[i].temperature)) < 0.51) {
                color3 = "#81C784";
            } else if ((Number(datacurrent[i].temperature)) > 0.5 && Number(datacurrent[i].temperature) < 5.01) {
                color3 = "#AED581";
            } else if ((Number(datacurrent[i].temperature)) > 5 && Number(datacurrent[i].temperature) < 10.01) {
                color3 = "#FFB74D";
            } else if ((Number(datacurrent[i].temperature)) > 10) {
                color3 = "#FF8A65";
            }

            // Write the body of the table
            table += "<tbody><tr>";
            table += "<td>" + datacurrent[i].station + "</td>";
            table += '<td bgcolor="' + color1 + '">' + datacurrent[i].temperature + "</td>"
            table += '<td bgcolor="' + color2 + '">' + datacurrent[i].CO2 + "</td>";
            table += '<td bgcolor="' + color3 + '">' + datacurrent[i].VolatileComponents + "</td>";
            table += "</tr></tbody>";
        };
    };
    table += "</table>";
    //Output table
    return table;
    //var output = document.getElementById('output') // Output completed table
    //output.innerHTML = table;
};


//buildtable(); // Test table building using local data
