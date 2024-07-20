import React,{useState,useRef} from 'react'
import searchIcon from '../assets/search.png'

import {
  humidityWeather,
  windWeather,
  notAvailable,
  sunny,
  mostlySunny,
  partlySunny,
  mostlyCloudy,
  cloudy,
  overcast,
  overcastClouds,
  Fog,
  lightRain,
  rain,
  possibleRain,
  rainShower,
  thunderstorm,
  localThunderstorm,
  lightSnow,
  snow,
  possibleSnow,
  snowShower,
  rainSnow,
  possibleRainSnow,
  RainAndSnow,
  freezingRain,
  possibleFreezingRain,
  hail,
  clearNight,
  mostlyClearNight,
  partlyClearNight,
  mostlyCloudNight,
  cloudyNight,
  overcastLowClouds,
  nightRainShower,
  nightLocalThunderstorm,
  nightSnowShower,
  nightRainSnow,
  nightPossibleFreezingRain
} from '../assets/Index'
import axios from 'axios'

function Weather() {
    const [weatherData, setWeatherData] = useState({})
    const [fetchError, setFetchError] = useState(null)
    const inputRef = useRef()

     const allIcon = {
       1:notAvailable,
       2: sunny,
       3: mostlySunny,
       4: partlySunny,
       5: mostlyCloudy,
       6: cloudy,
       7: overcast,
       8: overcastClouds,
       9: Fog,
       10: lightRain,
       11: rain,
       12: possibleRain,
       13: rainShower,
       14: thunderstorm,
       15: localThunderstorm,
       16: lightSnow,
       17: snow,
       18: possibleSnow,
       19: snowShower,
       20: rainSnow,
       21: possibleRainSnow,
       22: RainAndSnow,
       23: freezingRain,
       24: possibleFreezingRain,
       25: hail,
       26: clearNight,
       27: mostlyClearNight,
       28: partlyClearNight,
       29: mostlyCloudNight,
       30: cloudyNight,
       31: overcastLowClouds,
       32: nightRainShower,
       33: nightLocalThunderstorm,
       34: nightSnowShower,
       35: nightRainSnow,
       36: nightPossibleFreezingRain,
     };
    const search = async (city) => {
      try {
        const url = `https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=current&timezone=UTC&language=en&units=metric&key=${
          import.meta.env.VITE_API_KEY
        }`;
        const response = await axios.get(url);
        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          const icons = allIcon[data.current.icon_num];
          setWeatherData({
            city,
            precipitations: data.current.precipitation.type,
            windSpeed: data.current.wind.speed,
            temperature: data.current.temperature,
            icon: icons,
            weather: data.current.summary,
          });
          setFetchError(null); // Clear any previous errors
        } else {
          throw new Error("API error with status code: " + response.status);
        }
      } catch (error) {
        console.error("Fetch error: ", error.message);
        setFetchError(
          `${error.message} : Error fetching weather data. Please try again later, check your API.`
        );
        // Re-throw the error
        throw error;
      }
    };

  return (
    <>
      <div className="place-self-center w-[95%] sm:w-[80%] lg:w-1/3 min-h-3/4 h-fit p-10 pb-10 rounded-xl bg-gradient-to-tr from-blue-800 via-blue-500 to-purple-400 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <input
            ref={inputRef}
            className="border-none h-9 rounded-lg placeholder:text-gray-600 px-2 placeholder:px-2 "
            type="text"
            placeholder="Search"
          />
          <img
            className="sm:w-12 w-9 px-4 py-3 rounded-2xl bg-white cursor-pointer"
            onClick={() => search(inputRef.current.value)}
            src={searchIcon}
            alt="search"
          />
        </div>
        <p className="text-white text-4xl sm:text-7xl mt-4 font-semibold">
          {weatherData.city}
        </p>

        {/* conditional rendering */}

        {weatherData.icon && !fetchError ? (
          <>
            <img
              className="sm:w-150 w-[100px] bg-cover my-9"
              src={weatherData.icon}
              alt="clear weather"
            />
          </>
        ) : (
          <>
            <img
              className="sm:w-150 w-[100px] bg-cover my-9"
              src={allIcon[1]}
              alt="enter city"
            />
            {!fetchError ? (
              <h1 className="text-white text:2xl sm:text-3xl mt-4 font-semibold">
                Search city
              </h1>
            ) : (
              <h2 className="text-center text:xl sm:text-2xl mt-4 font-black text-white">
                {fetchError}
              </h2>
            )}
          </>
        )}
        <h2 className="text-white text-4xl sm:text-7xl font-bold">
          {weatherData.temperature && `${weatherData.temperature}°C`}
        </h2>

        <h4 className="text-white text-xl sm:text-2xl mt-4 font-semibold">
          {weatherData.weather}
        </h4>
        <div className="text-white w-full mt-10 flex justify-between">
          <div className="flex items-start gap-3 text-md">
            <img
              className="w-6 mt-3"
              src={humidityWeather}
              alt="humidity icon"
            />
            <div>
              <p>{weatherData.precipitations}</p>
              <span className="block text-sm">precipitations</span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-md">
            <img className="w-6 mt-3" src={windWeather} alt="humidity icon" />
            <div>
              <p>{weatherData.windSpeed}</p>
              <span className="block text-sm">wind speed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather
