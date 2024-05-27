import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("delhi");
  const [tempInfo, setTempInfo] = useState("");

  const getWeatherInfo = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=68ec0ac0c699e36e2e50d2133e9f828e`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, pressure, humidity } = data.main;
      const { main: weatherMode } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        pressure,
        humidity,
        weatherMode,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [searchValue]);

  return (
    <>
      <div className="wrap">
        <div className="serach">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
