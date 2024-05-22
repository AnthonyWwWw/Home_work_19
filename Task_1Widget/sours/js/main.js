document.addEventListener('DOMContentLoaded', () => {
    const cities = [
        { name: 'Kiev', lat: 50.43, lon: 30.52 },
        { name: 'Odesa', lat: 46.45, lon: 30.72 },
        { name: 'Kharkiv', lat: 49.98, lon: 36.25 },
    ];

    let savedLat = 50.43;
    let savedLon = 30.52;
    fetchWeather(savedLat, savedLon);
    const regionList = document.getElementById('regionList');
    cities.forEach(city => {
        const li = document.createElement('li');
        li.className = 'item-list';
        li.dataset.lat = city.lat;
        li.dataset.lon = city.lon;
        li.textContent = city.name;
        regionList.appendChild(li);
    });

    const selectionCity = document.querySelectorAll('.item-list');

    document.querySelector('#buttonLoading').addEventListener('click', () => {
        let { lat, lon } = saveSelection();
        fetchWeather(lat, lon);
    });

    async function fetchWeather(lat, lon) {
        try {
            const API_KEY = '5d7e7216f3524b6224bab80c4df2aaa6';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ua`;

            const response = await fetch(url);
            const data = await response.json();

            renderWidget(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function renderWidget(data) {
        const countryBlock = document.querySelector('#countryBlock');
        countryBlock.textContent = `${data.name}`;

        const windBlock = document.querySelector('#windBlock');
        windBlock.textContent = `Wind: ${data.wind.speed} km/h`;

        const weatherBlock = document.querySelector('#weatherBlock');
        const mainWeather = data.weather.map(element => element.main).join(', ');
        weatherBlock.textContent = `Weather: ${mainWeather.toLowerCase()}`;

        const temperatureBlock = document.querySelector('#temperatureBlock');
        temperatureBlock.textContent = `Temperature: ${Math.floor(data.main.feels_like)}°C`;
    }

    selectionCity.forEach(element => {
        element.addEventListener('click', event => {
            const elementTarget = event.target;
            const lat = elementTarget.getAttribute('data-lat');
            const lon = elementTarget.getAttribute('data-lon');

            switch (elementTarget.innerHTML) {
                case 'Kiev':
                    selectionKiev();
                    fetchWeather(lat, lon);
                    saveSelection(lat, lon);
                    break;
                case 'Odesa':
                    selectionOdesa();
                    fetchWeather(lat, lon);
                    saveSelection(lat, lon);
                    break;
                case 'Kharkiv':
                    selectionKharkiv();
                    fetchWeather(lat, lon);
                    saveSelection(lat, lon);
                    break;
                default:
                    selectionKiev();
                    fetchWeather(lat, lon);
                    saveSelection(lat, lon);
            }
        });
    });

    function selectionKiev() {
        document.body.style.backgroundImage = 'url(./sours/img/mother-motherland-monument-sunset-kiev-ukraine.jpg)';
    }

    function selectionOdesa() {
        document.body.style.backgroundImage = 'url(./sours/img/aerial-footage-old-city-port.jpg)';
    }

    function selectionKharkiv() {
        document.body.style.backgroundImage = 'url(./sours/img/city-6151217.jpg)';
    }

    function saveSelection(lat, lon) {
        if (lat && lon) {
            savedLat = lat;
            savedLon = lon;
        }
        return { lat: savedLat, lon: savedLon };
    }
});
