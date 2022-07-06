// Creating date variable
let d = new Date();

//OpenWeatherMap API Key
const apiKey = '&appid=90422a43f64df9c7045ac228a0c928c6&units=metric';

//OpenWeatherMap API URL
const url = `https://api.openweathermap.org/data/2.5/weather?zip=`;

// Event listener
document.getElementById('generate').addEventListener('click', function (){

    // Get data from user input
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // Get weather data
    getWeather(url,zip,apiKey).then(function(data) {
        console.log(data);
        postData('/add', {date:d, temp:data.main.temp, content:feelings});

        // Update the UI
        updateApp();
    })
});

/* Function to GET data from Web API*/
const getWeather = async (url,zip,apiKey) => {
    const res = await fetch(url+zip+apiKey);
    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log("error", error);
    }};

/*POST data */
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        date: data.date,
        temp: data.temp,
        content: data.content
    });
    try {
        const newData = await req.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }};


/*GET Project Data */
const updateApp = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML =`Temperature is ` + allData.temp + `°C`;
    document.getElementById('content').innerHTML = `I feel ` + allData.content;
    }
    catch(error) {
      console.log("error", error);
    }
   };