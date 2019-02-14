// Incoming data 
var data = [
    {
        "line":"Bakerloo",
        "number":"245",
        "station":"South Kensington",
        "temp":"24",
        "co2":"56",
        "tvoc":"575"
    },
    {
        "line":"Bakerloo",
        "number":"258677295",
        "station":"South Kensington",
        "temp":"24",
        "co2":"56",
        "tvoc":"575"
    },
    {
        "line":"Bakerloo",
        "number":"245",
        "station":"South Kensington",
        "temp":"24",
        "co2":"56",
        "tvoc":"575"
    },
    {
        "line":"Bakerloo",
        "number":"25657578689",
        "station":"South Kensington",
        "temp":"24",
        "co2":"56",
        "tvoc":"575"
    }
]



// Build HTML table
function buildtable() {

    // Save Data
    //var datacurrent = JSON.parse(data);
    var datacurrent = data;

    var table = "";
	table += "<table>";
	table += "<tr><th><center>Station</center></th><th><center>Temperature</center></th><th><center>C02</center></th><th><center>VTOC</center></th></tr>"
	for (i = datacurrent.length - 1; i >= 0; i--) {
		table += "<tr>";
		table += "<td>" + datacurrent[i].station + "</td>";
		table += "<td>" + datacurrent[i].temp + "</td>"
        table += "<td>" + datacurrent[i].co2 + "</td>";
        table += "<td>" + datacurrent[i].tvoc + "</td>";
		table += "</tr>";
	}
	table += "</table>";
    var output = document.getElementById('output')
    output.innerHTML = table;
    console.log(data2.length)
}
buildtable();