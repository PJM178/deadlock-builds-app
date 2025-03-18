"use client"

import { useEffect, useRef, useState } from "react";
import { Cities, WeatherConditions, WeatherData } from "../../../../../server/src/types/weather";

const TestFetchData = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [apiWeatherData, setApiWeatherData] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dbWeatherData, setDbWeatherData] = useState<any>(null);
  const abortControllerRef = useRef<AbortController>(null);

  const handleFetchData = async () => {
    try {
      // Abort the previous request if it's still in progress
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create a new AbortController for the current request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const element = document.getElementById("error");
      if (element) {
        element.innerHTML = "loading...";
      }

      const response = await fetch("http://localhost:5000/recipes", {
        signal: abortController.signal, // Associate the fetch with the controller
      });

      if (!response.ok) {
        throw new Error("Fetch error");
      }

      const data = await response.json();

      if (element) {
        element.innerHTML = "";
      }

      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          console.log("Previous request aborted");
          return;
        }
      }

      const element = document.getElementById("error");
      if (element) {
        element.style.color = "red";
        element.innerHTML = "Something went wrong";
        setTimeout(() => {
          element.innerHTML = "";
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=helsinki&units=metric&appid=");
        const data = await res.json();

        setApiWeatherData(data);
      } catch (err) {
        console.log("Error fetching weather data:", err);
      }
    };

    fetchData();
  }, []);
  console.log(apiWeatherData);
  const handleSubmitWeatherData = async () => {
    if (!apiWeatherData) {
      console.log("No data to submit");
      return;
    }

    try {
      const cityData: Cities = {
        id: apiWeatherData.id,
        name: apiWeatherData.name,
        country_code: apiWeatherData.sys.country,
        latitude: apiWeatherData.coord.lat,
        longitude: apiWeatherData.coord.lon,
      };

      const weatherConditionData: WeatherConditions = {
        id: apiWeatherData.weather[0].id,
        description: apiWeatherData.weather[0].description,
        icon: apiWeatherData.weather[0].icon,
      };

      const weatherData: WeatherData = {
        temperature: apiWeatherData.main.temp,
        feels_like: apiWeatherData.main.feels_like,
        wind_speed: apiWeatherData.wind.speed,
        recorded_at: apiWeatherData.dt,
        condition_id: apiWeatherData.weather[0].id,
        city_id: apiWeatherData.id,
      };

      const res = await fetch("http://localhost:5000/api/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cityData, weatherConditionData, weatherData }),
      });

      if (res.ok) {
        const result = await res.json();
        console.log(`Data submitted successfully! ID: ${result.id}`);
      } else {
        const errorResult = await res.json();
        console.log(`Failed to submit data: ${errorResult.error}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetWeatherData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/weather");

      if (res.ok) {
        const result = await res.json();
        setDbWeatherData(result);
      } else {
        const errorResult = await res.json();
        console.log(`Failed to submit data: ${errorResult.error}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(dbWeatherData);
  return (
    <>
      <button onClick={handleFetchData}>test</button>
      <button onClick={handleGetWeatherData}>get weather data</button>
      <button onClick={handleSubmitWeatherData}>submit weather data</button>
      <div id="error" />
      <ol>
        {dbWeatherData.map(data => (
          <li key={data.id}>{data.temperature}</li>
        ))}
      </ol>
    </>
  );
};

export default TestFetchData;
