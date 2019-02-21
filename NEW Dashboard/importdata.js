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
        "temp":"8",
        "co2":"300",
        "tvoc":"0.2"
    },
    {
        "line":"Bakerloo",
        "number":"25657578689",
        "station":"Ton",
        "temp":"80",
        "co2":"200",
        "tvoc":"5.6"
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
    var color1 = "";
    var color2 = "";
    var color3 = "";
	table += '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">';
    table += '<thead><tr><th><center>STATION</center></th><th><center>TEMP</center></th><th><center>C02 (ppm)</center></th><th><center>VTOC (ppm)</center></th></tr></thead>'
	for (i = datacurrent.length - 1; i >= 0; i--) {
        if(datacurrent[i].line === identify) {

            // Set colours based on temperature range
            if((Number(datacurrent[i].temp)) < 11) {
                color1 = "#4FC3F7";
            } else if ((Number(datacurrent[i].temp)) > 10 && Number(datacurrent[i].temp) < 20) {
                color1 = "#4DD0E1";
            } else if ((Number(datacurrent[i].temp)) > 19 && Number(datacurrent[i].temp) < 26) {
                color1 = "#81C784";
            } else if ((Number(datacurrent[i].temp)) > 25 && Number(datacurrent[i].temp) < 30) {
                color1 = "#FFB74D";
            } else if ((Number(datacurrent[i].temp)) > 29) {
                color1 = "#FF8A65";
            }   
        
        
        // Set colour based on c02 range
            if((Number(datacurrent[i].temp)) < 351) {
                color2 = "#81C784";
            } else if ((Number(datacurrent[i].temp)) > 350 && Number(datacurrent[i].temp) < 601) {
                color2 = "#AED581";
            } else if ((Number(datacurrent[i].temp)) > 600 && Number(datacurrent[i].temp) < 1001) {
                color2 = "#DCE775";
            } else if ((Number(datacurrent[i].temp)) > 1000 && Number(datacurrent[i].temp) < 2001) {
                color2 = "#FFB74D";
            } else if ((Number(datacurrent[i].temp)) > 2000) {
                color2 = "#FF8A65";
            }


        // Set colour based on tvoc range
            if((Number(datacurrent[i].temp)) < 0.51) {
                color3 = "#81C784";
            } else if ((Number(datacurrent[i].temp)) > 0.5 && Number(datacurrent[i].temp) < 5.01) {
                color3 = "#AED581";
            } else if ((Number(datacurrent[i].temp)) > 5 && Number(datacurrent[i].temp) < 10.01) {
                color3 = "#FFB74D";
            } else if ((Number(datacurrent[i].temp)) > 10) {
                color3 = "#FF8A65";
            }
        

            // Write the body of the table
            table += "<tbody><tr>";
            table += "<td>" + datacurrent[i].station + "</td>";
            table += '<td bgcolor="' + color1 + '">' + datacurrent[i].temp + "</td>"
            table += '<td bgcolor="' + color2 + '">' + datacurrent[i].co2 + "</td>";
            table += '<td bgcolor="' + color3 + '">' + datacurrent[i].tvoc + "</td>";
            table += "</tr></tbody>";
        };
    };
    table += "</table>";
    //Output table
    var output = document.getElementById('output')
    output.innerHTML = table;
};
buildtable();