/**
 * config the page status
 */
import { useState } from "react";

interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

// initial config
const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

// here, initialState is the user input state
export const useAsync = <T>(initialState?: State<T>) => {
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: T) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // trigger the async call
  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error("please input the promise type data");
    }
    // before transfer data
    setState({ ...state, stat: "loading" });
    // transfer data or get error
    return (
      promise
        .then((data) => {
          setData(data);
          return data;
        })
        // catch can absorb the exception
        .catch((err) => {
          setError(err);
          // return err;
          return Promise.reject(err);
        })
    );
  };

  // output the information
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
