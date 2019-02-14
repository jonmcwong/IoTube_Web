// TEST data 
var datatest = [
    {
        "line":"circle",
        "number":"245",
        "station":"South ",
        "temp":"24",
        "co2":"56",
        "tvoc":"575"
    },
    {
        "line":"central",
        "number":"258677295",
        "station":"Soton",
        "temp":"254",
        "co2":"5996",
        "tvoc":"55e75"
    },
    {
        "line":"circle",
        "number":"245",
        "station":"South sington",
        "temp":"254",
        "co2":"576",
        "tvoc":"5575"
    },
    {
        "line":"central",
        "number":"25657578689",
        "station":"Kensington",
        "temp":"254",
        "co2":"5",
        "tvoc":"575465"
    },
    {
        "line":"Bakerloo",
        "number":"25657578689",
        "station":"Kensington",
        "temp":"254",
        "co2":"5",
        "tvoc":"575465"
    }
]

//INSERT DATA HERE
var data = []
//var datacurrent = JSON.parse(data); -- use if stringyfied


// Build HTML table
function buildtable() {

    //Identify which line we are filtering
    var identify = document.getElementById('tag').textContent;

    // Save Data
    var datacurrent = data;

    // Create table
    var table = "";
	table += "<table>";
	table += "<tr><th><center>Station</center></th><th><center>Temperature</center></th><th><center>C02</center></th><th><center>VTOC</center></th></tr>"
	for (i = datacurrent.length - 1; i >= 0; i--) {
        console.log(datacurrent[i].line)
        if(datacurrent[i].line === identify) {
            table += "<tr>";
            table += "<td>" + datacurrent[i].station + "</td>";
            table += "<td>" + datacurrent[i].temp + "</td>"
            table += "<td>" + datacurrent[i].co2 + "</td>";
            table += "<td>" + datacurrent[i].tvoc + "</td>";
            table += "</tr>";
        }
	}
    table += "</table>";

    //Output table
    var output = document.getElementById('output')
    output.innerHTML = table;
}
buildtable();