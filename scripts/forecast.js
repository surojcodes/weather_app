const API_KEY = 'LK5Ejvh3LkaAUGk7m9Wb8jvYNZknFe8e';
const getCity = async (city) => {
    const base_url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${API_KEY}&q=${city}`;

    const response = await fetch(base_url + query);
    const data = await response.json();

    return data[0];
}

const getWeather = async (city_key) => {
    const base_url = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${city_key}?apikey=${API_KEY}`;

    const response = await fetch(base_url + query);
    const data = await response.json();

    return data[0];
}
