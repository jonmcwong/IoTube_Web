// TEST data 
var datatest = [
    {
        "line":"Bakerloo",
        "number":"245",
        "station":"Stonebridge",
        "temp":"19",
        "co2":"875",
        "tvoc":"1"
    },
    {
        "line":"Bakerloo",
        "number":"258677295",
        "station":"Wembley Central",
        "temp":"14",
        "co2":"586",
        "tvoc":"1"
    },
    {
        "line":"Bakerloo",
        "number":"245",
        "station":"North Wembley",
        "temp":"31",
        "co2":"165",
        "tvoc":"1"
    },
    {
        "line":"Bakerloo",
        "number":"25657578689",
        "station":"South Kenton",
        "temp":"27",
        "co2":"522",
        "tvoc":"0"
    },
    {
        "line":"Bakerloo",
        "number":"25657578689",
        "station":"Kent Underground Station",
        "temp":"28",
        "co2":"560",
        "tvoc":"1"
    }
]

//INSERT DATA HERE
var data = [{"line":"Bakerloo","number":"243","station":"Paddington"},{"line":"Bakerloo","number":"203","station":"North Wembley"},{"line":"Bakerloo","number":"223","station":"Waterloo"},{"line":"Bakerloo","number":"241","station":"Marylebone"},{"line":"Bakerloo","number":"240","station":"Lambeth North"},{"line":"Bakerloo","number":"224","station":"Wembley Central"},{"line":"Bakerloo","number":"202","station":"Warwick Avenue"},{"line":"Bakerloo","number":"221","station":"Kensal Green"},{"line":"Bakerloo","number":"204","station":"Harlesden"},{"line":"Bakerloo","number":"222","station":"Kilburn Park"}]
//var datacurrent = JSON.parse(data); -- use if stringyfied


// Build HTML table
function buildtable() {

    //Identify which line we are filtering
    var identify = document.getElementById('tag').textContent;

    // Save Data
    var datacurrent = datatest;

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