import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import Loading from "./components/Loading";
import Chart from "./components/Chart";
import styled from "styled-components";

const Header = styled.header`
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 1rem;
`;
const queryChache = new QueryCache();

function App() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://public.ecologi.com/trees").then((res) => res.json())
  );

  if (isLoading) return isLoading;

  if (error) return "An error has occurred: " + error.message;

  console.warn("data", data);

  return (
    <ReactQueryCacheProvider queryCache={queryChache}>
      <Loading loading={isLoading} />
      <div className="App">
        <Header></Header>
        <Chart />
      </div>
    </ReactQueryCacheProvider>
  );
}

export default App;
