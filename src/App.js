import { useState, useEffect } from 'react';

export const WeatherIcons = {
  "01d": "/icons/status/sunny.svg",
  "01n": "/icons/status/night.svg",
  "02d": "/icons/status/day.svg",
  "02n": "/icons/status/cloudy-night.svg",
  "03d": "/icons/status/cloudy.svg",
  "03n": "/icons/status/cloudy.svg",
  "04d": "/icons/status/perfect-day.svg",
  "04n": "/icons/status/cloudy-night.svg",
  "09d": "/icons/status/rain.svg",
  "09n": "/icons/status/rain-night.svg",
  "10d": "/icons/status/rain.svg",
  "10n": "/icons/status/rain-night.svg",
  "11d": "/icons/status/storm.svg",
  "11n": "/icons/status/storm.svg",
};

const App = () => {
  const [city, setCity] = useState("Tokyo");
  const [inputCity, setInputCity] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
        const weatherData = await response.json();
        const { name, sys: {country}, main: {temp, pressure, humidity}, weather: [{icon, description}], wind: {speed} } = weatherData;
        setWeather({name, country, temp, pressure, humidity, icon, description, speed});
      } catch (error) {
        console.log(error)
      }
    }
    fetchWeatherData();
  }, [city])

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(inputCity);
    setInputCity("");
  }

  return ( 
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input className="search-bar" type="text" placeholder="Type some city..." value={inputCity} onChange={(event) => setInputCity(event.target.value)} />
        <input className="search-button" type="submit" value="Search" />
      </form>
      <h1 className="title">Weather in {weather.name}, {weather.country}</h1>
      <div className="wrapper">
        <img className="icon" src={WeatherIcons[weather.icon]} alt="Weather status icon" />
        <div className="info">
          <span className="temp">{weather.temp}°</span>
          <p className="description">{weather.description}</p>
        </div>
      </div>
      <div className="wrapper">
        <div className="wind">
          <img src="/icons/wind.svg" alt="Wind icon" />
          <span>{weather.speed} m/s</span>
        </div>
        <div className="humidity">
          <img src="/icons/humidity.svg" alt="Humidity icon" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="pressure">
          <img src="/icons/pressure.svg" alt="Pressure icon" />
          <span>{weather.pressure}</span>
        </div>
      </div>
    </>
   );
}
 
export default App;