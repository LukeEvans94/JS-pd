class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.humidity = document.getElementById('w-humidity');
        this.feelslike = document.getElementById('w-feelslike');
        this.dewpoint = document.getElementById('w-dewpoint');
        this.wind = document.getElementById('w-wind');
    }

    paint(weather) {
        this.location.textContent = weather.name;
        this.desc.textContent = weather.weather[0].description;
        this.string.textContent = weather.main.temp;
        this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`;
        this.dewpoint.textContent = `Wind Speed: ${weather.wind.speed}`;
        this.wind.textContent = `Wind Direction: ${weather.wind.deg}`;
    }
}