const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    const { city_details, weather_data } = data;
    details.innerHTML = `
        <h5 class="my-3 text-pink">${city_details.EnglishName}</h5>
        <div class="my-3">${weather_data.WeatherText}</div>
        <div class="display-4 my-4">
          <span class="text-pink">${weather_data.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
    `;

    const iconSrc = `img/icons/${weather_data.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

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
    form.reset();

    getWeatherData(city)
        .then(weather_data => updateUI(weather_data))
        .catch(err => console.log(err))
})