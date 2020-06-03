const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const icon = document.querySelector('.icon img');
const loader = document.querySelector('.loader');


const updateUI = (data) => {
    const { city_details, weather_data } = data;
    details.innerHTML = `
        <h5 class="my-3 text-blue">${city_details.EnglishName}</h5>
        <div class="my-3">${weather_data.WeatherText}</div>
        <div class="display-4 my-4">
          <span class="text-blue">${weather_data.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
    `;
    const iconSrc = `img/icons/${weather_data.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    icon.style.display = 'block';
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};
const noCityUI = (city) => {
    details.innerHTML = `
        <h4 class="text-red mt-3">No City ' ${city} '</h4> <br>
        <small>Free API used has limit to requests per day. <br> 
        So if your location is correct, try again tomorrow.<hr> <br></small>
        <p>Sorry !! 🙇‍♂️</p>`;
    // icon.style.display = 'none';
    icon.setAttribute('src', 'img/sorry.png');
    icon.setAttribute('width', '100%');
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

const getWeatherData = async (city) => {
    const city_details = await getCity(city);

    const weather_data = await getWeather(city_details.Key);
    return {
        city_details, weather_data
    };
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = form.city.value.trim();
    loadSpinner();
    getWeatherData(city)
        .then(weather_data => {
            removeSpinner();
            console.log(weather_data);
            updateUI(weather_data)
        })
        .catch(err => {
            removeSpinner();
            noCityUI(city);
        })
})

const loadSpinner = () => {
    card.style.display = 'none';
    loader.style.display = 'block';
}

const removeSpinner = () => {
    form.reset();
    loader.style.display = 'none';
    card.style.display = 'block';
}