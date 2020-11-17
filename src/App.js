import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import Loading from "./components/Loading";
import Chart from "./components/Chart";
import styled from "styled-components";
import groupBy from "lodash.groupby";

const Header = styled.header`
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 1rem;
`;
const queryChache = new QueryCache();

function App() {
  //call to api
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://public.ecologi.com/trees").then((res) => res.json())
  );
  if (isLoading) return isLoading;
  if (error) return "An error has occurred: " + error.message;

  //order purchases by date: https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
  const orderedByDay = data.data.sort(function (a, b) {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  //groups an array of ordered purchases by date (createdAt)
  //returns an object with arrays of objects
  const groupedByDay = groupBy(orderedByDay, (item) => {
    return item.createdAt.split("T")[0];
  });

  //add total purchases per day and return new object from the Map
  const totalPurchasesPerDay = Object.entries(groupedByDay).map(
    ([date, purchases]) => {
      const newPurchaseObj = {
        date: date,
        trees: purchases
          .filter((purchases) => typeof purchases.value === "number")
          .reduce((acc, purchases) => acc + purchases.value, 0),
      };
      return newPurchaseObj;
    }
  );

  console.warn("total purchases per day ", totalPurchasesPerDay);

  return (
    <ReactQueryCacheProvider queryCache={queryChache}>
      <Loading loading={isLoading} />
      <div className="App">
        <Header></Header>
        <Chart treeData={totalPurchasesPerDay} />
      </div>
    </ReactQueryCacheProvider>
  );
}

export default App;
