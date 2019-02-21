//This file contains the formulation of the ajax request to the TFL London Underground API






// define variable for API request
var request = new XMLHttpRequest();
//opening new connection
request.open(
  "GET",
  "https://api.tfl.gov.uk/line/bakerloo/arrivals",
  true
);

request.onload = function() {
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
        out_json = out_json.concat(JSON.stringify(useful_data));
        // to display:
      }
    }
  });
  //display
  document.write(out_json); // must be changed
}
// Send request
request.send();
