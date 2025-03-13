"use client"

import { useRef } from "react";

const TestFetchData = () => {
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
      if (err.name === "AbortError") {
        console.log("Previous request aborted");
        return;
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

  return (
    <>
      <button onClick={handleFetchData}>test</button>
      <div id="error" />
    </>
  );
};

export default TestFetchData;
