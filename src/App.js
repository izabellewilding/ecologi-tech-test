import "./App.css";
import { useState } from "react";
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import Loading from "./components/Loading";

const queryChache = new QueryCache();

function App() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://public.ecologi.com/trees").then((res) => res.json())
  );

  if (isLoading) return isLoading;

  if (error) return "An error has occurred: " + error.message;

  return (
    <ReactQueryCacheProvider queryCache={queryChache}>
      <Loading loading={isLoading} />
      <div className="App">
        <header></header>
      </div>
    </ReactQueryCacheProvider>
  );
}

export default App;
