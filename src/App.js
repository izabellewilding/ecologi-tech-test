import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import Loading from "./components/Loading";
import Chart from "./components/Chart";
import styled from "styled-components";
import groupBy from "lodash.groupby";
import { ReactComponent as BrandLogo } from "./assets/ecologi.svg";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #e8e4df;
`;

const Header = styled.header`
  align-items: center;
  position: fixed;
  display: flex;
  width: 100%;
  height: 3rem;
  padding: 1rem;
  background-color: #03080a;
`;

const HeaderOffset = styled.div`
  padding-top: 6rem;
`;

const Logo = styled(BrandLogo)`
  height: 51px;
`;

const queryChache = new QueryCache();

function App() {
  //data fetching
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://public.ecologi.com/trees").then((res) => res.json())
  );
  if (isLoading) return <Loading loading={isLoading} />;
  if (error) return "An error has occurred: " + error.message;

  //order purchases array by createdAt date:
  //resource: https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
  const orderedByDay = data.data.sort(function (a, b) {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  //groups an array of ordered purchases by day (createdAt)
  //returns an object with arrays of objects
  //resource: https://lodash.com/docs/4.17.15#groupBy
  //use state to switch out the filtering
  const groupedByDay = groupBy(orderedByDay, (item) => {
    return item.createdAt.split("T")[0];
  });

  //add total purchases per day and return new object from the Map
  //resources: https://dev.to/attacomsian/object-entries-and-object-values-methods-in-javascript-3l8c, https://stackoverflow.com/questions/47841899/js-map-return-object
  const totalPurchasesPerDay = Object.entries(groupedByDay).map(
    ([date, purchases]) => {
      const dailyPurchaseObj = {
        date: date,
        trees: purchases
          //filter only the number dates - data was being weird, assuming there's a string in it
          .filter((purchases) => typeof purchases.value === "number")
          .reduce((acc, purchases) => acc + purchases.value, 0),
      };
      return dailyPurchaseObj;
    }
  );

  //I WOULD TRY AND COMBINE THIS WITH THE CODE ABOVE WITH MORE TIME
  //group the array of ordered purchases by the month and year
  const groupedByYearMonth = groupBy(orderedByDay, (item) => {
    return item.createdAt.substring(0, 7);
  });
  //return a new object with the total purchases for each month
  const totalPurchasesPerMonth = Object.entries(groupedByYearMonth).map(
    ([date, purchases]) => {
      const monthlyPurchaseObj = {
        date: date,
        trees: purchases
          .filter((purchases) => typeof purchases.value === "number")
          .reduce((acc, purchases) => acc + purchases.value, 0),
      };
      return monthlyPurchaseObj;
    }
  );

  return (
    <ReactQueryCacheProvider queryCache={queryChache}>
      <Header>
        <Logo />
      </Header>
      <AppContainer>
        <HeaderOffset />
        <Chart
          dailyTreeData={totalPurchasesPerDay}
          monthlyTreeData={totalPurchasesPerMonth}
        />
      </AppContainer>
    </ReactQueryCacheProvider>
  );
}

export default App;
