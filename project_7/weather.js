class Weather {
    constructor(city,state) {
        this.apiKey = 'f0ab542b9f7f5df62b52e199fa207c67';
        this.city = city;
        this.state = state;
    }

    async getWeather() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&APPID=${this.apiKey}`);
        const resonseData = await response.json();
        return resonseData;
    }

    changeLocation(city,state){ 
        this.city = city;
        this.state = state;
    }
}