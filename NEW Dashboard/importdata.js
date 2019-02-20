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
        "line":"Bakerloo",
        "number":"25657578689",
        "station":"Kensington",
        "temp":"254",
        "co2":"5",
        "tvoc":"575465"
    },
    {
        "line":"Bakerloo",
        "number":"25657578689",
        "station":"Ton",
        "temp":"254",
        "co2":"5",
        "tvoc":"575465"
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
	table += '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">';
    table += '<thead><tr><th><center>STATION</center></th><th><center>TEMPERATURE</center></th><th><center>C02</center></th><th><center>VTOC</center></th><th><center>CONDITION</center></th></tr></thead>'
	for (i = datacurrent.length - 1; i >= 0; i--) {
        console.log(datacurrent[i].line)
        if(datacurrent[i].line === identify) {
            table += "<tbody><tr>";
            table += "<td>" + datacurrent[i].station + "</td>";
            table += '<td class="check">' + datacurrent[i].temp + "</td>"
            table += "<td>" + datacurrent[i].co2 + "</td>";
            table += "<td>" + datacurrent[i].tvoc + "</td>";
            table += '<td class="heat">' + "</td>"
            table += "</tr></tbody>";
        }
	}
    table += "</table>";

    //Output table
    var output = document.getElementById('output')
    output.innerHTML = table;
}
buildtable();

$(document).ready(function(){
    $('#dataTable td.check').each(function(){
        if ($(this).text() == '254') {
            $('#dataTable td.heat').css('background-color','#f00');
        }
    });
});
