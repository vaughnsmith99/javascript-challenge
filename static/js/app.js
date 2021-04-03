// from data.js
var tableData = data;

//from usStates.js
var usstates = usStates;

// Select the button
var button = d3.select("button");

// Select the form
var form = d3.select("form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();
  
  // Get value of the input element
  var DataFromForm = fetchDataFromForm();

  // Filter values
  var filtered = filterValues(DataFromForm, tableData);

  updateDisplay(filtered);
  console.log(filtered);

};

function fetchDataFromForm() {
    console.log("Fetching Data.");
    return {
        datetime: lookAtData(d3.select("#datetime").property("value")),

		city: lookAtCity(d3.select("#city").property("value")),
		
        state: lookAtState(d3.select("#state").property("value")),
		
        country: countryUS(d3.select("#country").property("value")),
		
        shape: lookAtShape(d3.select("#shape").property("value"))
    };
};

function lookAtData(datetime = "") {
	console.log(`Fetching Date: ${datetime}`);
	if (datetime === null || datetime.trim().length < 1 || datetime.trim().split("/").length < 3);
        return null;
    split = datetime.trim().split("/")
	var year = parseInt(split[2]);
	var month = parseInt(split[1]);
	var day = parseInt(split[0]);
	return `${day}/${month}/${year}`;
}

function lookAtCity(city = "") {
    console.log(`Fetching City: ${city}`);
	if (city === null || city.trim().length < 1)
		return null;
    city = city.trim()
	return city.toLowerCase();
}

function lookAtState(state = "") {
    console.log(`Fetching State: ${state}`);
	if (state === null || state.trim().toLowerCase().length < 1)
		return null;
	state = state.trim().toLowerCase();
	if (state.length > 2) {
		var stateLength = usstates.length;
		for (var i = 0; i < stateLength; i++) {
            console.log(`usStates: ${usstates[i]}`)
			if (usstates[i].name.toLowerCase() === state) {
				console.log(`State: ${state}`);
				return usstates[i].abbreviation.toLowerCase();
			}
		}
	}
	return state;
}

function countryUS(country = "") {
    console.log(`Checking Country: ${country}`)
	if (country === null || country.trim().toLowerCase().length < 1)
		return null;
	country = country.trim().toLowerCase();
	if ( country === "usa" )
		country = "us";
    if ( country != "usa" )
        console.log("Cities outside of the USA are not recognized.");
	return country;
}

function lookAtShape(shape) {
    console.log(`Fetching shape: ${shape}`);
	if (shape.trim().length < 1)
		return null;
	return shape.trim();
}

function filterValues(formData, tableData) {
	var data = tableData;
	for (var key in formData) {
		if (formData[key] !== null && data.length > 0) {
			data = data.filter( function ( value, index, arr ) {
				return value[ key] === formData[key];
			});
		}
	}
    console.log(`Data: ${data}`);
	return data;
}

function updateDisplay(filtered = []) {
	var body = d3.select("tbody");
	body.text("");
	if (filtered === null)
		return;
	if (filtered.length > 0) {
		var body = d3.select("tbody");
		filtered.forEach(filtered => {
			var row = body.append("tr");
			Object.entries(filtered).forEach(function ([key, value]) {
				row.append("td").text(value);
			});
		});
	}
}