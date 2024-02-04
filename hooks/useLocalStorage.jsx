"use client"
import { useState } from "react";

const useLocalStorage = (keyName, defaultValue) => 
{
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const value = window.localStorage.getItem(keyName);
  
        if (value) {
          return JSON.parse(value);
        } else {
          window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
          return defaultValue;
        }
      } catch (err) {
        return defaultValue;
      }
    });
}

export default useLocalStorage