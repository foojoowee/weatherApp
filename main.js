const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'a3bd9769b29655d19c244e7170c3ff60'
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
            .then(json => {
            if (json.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'Assets/clear.png';
                    break;
                case 'Rain':
                    image.src = 'Assets/rain.png';
                    break;
                case 'Snow':
                    image.src = 'Assets/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'Assets/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'Assets/mist.png';
                    break;
                default:
                    image.src = '';
                
            }

            temperature.innerHTML =  `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}kM/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
});



// example of the APi response from the website in JSON

// {
//     "coord": {
//       "lon": 10.99,
//       "lat": 44.34
//     },
//     "weather": [
//       {
//         "id": 501,
//         "main": "Rain",
//         "description": "moderate rain",
//         "icon": "10d"
//       }
//     ],
//     "base": "stations",
//     "main": {
//       "temp": 298.48,
//       "feels_like": 298.74,
//       "temp_min": 297.56,
//       "temp_max": 300.05,
//       "pressure": 1015,
//       "humidity": 64,
//       "sea_level": 1015,
//       "grnd_level": 933
//     },
//     "visibility": 10000,
//     "wind": {
//       "speed": 0.62,
//       "deg": 349,
//       "gust": 1.18
//     },
//     "rain": {
//       "1h": 3.16
//     },
//     "clouds": {
//       "all": 100
//     },
//     "dt": 1661870592,
//     "sys": {
//       "type": 2,
//       "id": 2075663,
//       "country": "IT",
//       "sunrise": 1661834187,
//       "sunset": 1661882248
//     },
//     "timezone": 7200,
//     "id": 3163858,
//     "name": "Zocca",
//     "cod": 200
//   }                        
  