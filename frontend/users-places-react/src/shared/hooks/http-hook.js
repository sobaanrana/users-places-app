import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";

export const useHttpCleint = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const activeHttpRequests = useRef([]); // to store the active requests

  const SendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController(); // to abort the request if the component unmounts
      activeHttpRequests.current.push(httpAbortCtrl); // add the request to the active requests
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal, // pass the signal to the fetch request
        }); // it does yeild a promise so we can use async await or then catch
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        ); // remove the request from the active requests

        if (!response.ok) {
          throw new Error(responseData.message);
        } // if we get a 404 or 500 error, we can throw an error
        setIsLoading(false);
        return responseData;
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request was aborted");
          setIsLoading(false);
          return;
        }
        setError(error.message || "Something went wrong");
        setIsLoading(false);
        throw error;
      }
      setIsLoading(false);
    },
    []
  ); // so that this function is not recreated on every render of component being used in, we use useCallback

  const clearError = () => {
    setError(null);
  };

  // cleanup function to abort the requests
  // this will run when the component unmounts
  // and also when the component is re-rendered

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort()); // abort all the requests
    };
  }, []);

  return { isLoading, error, SendRequest, clearError };
};
