import { useState, useEffect } from "react";
import { ReactComponent as BrandLogo } from "./assets/ecologi.svg";
import styled from "styled-components";
import groupBy from "lodash.groupby";

import Chart from "./components/Chart";
import Loading from "./components/Loading";
import { TopTabs, BottomTabs } from "./components/Tab";
import "./vars.css";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  background-color: #e8e4df;
`;

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;

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

function App() {
  const [treeData, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTreeData() {
      setLoading(true);
      try {
        const response = await fetch("https://public.ecologi.com/trees");
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.warn(error);
      }
    }
    getTreeData();
  }, []);

  if (loading || !treeData) return <Loading loading={loading} />;

  //order purchases array by createdAt date:
  //resource: https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
  const orderedByDay = treeData.data.sort(function (a, b) {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  //groups an array of ordered purchases by day (createdAt)
  //returns an object with arrays of objects
  //resource: https://lodash.com/docs/4.17.15#groupBy
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
    <>
      <Header>
        <Logo />
      </Header>
      <AppContainer>
        <HeaderOffset />
        <TopTabs
          tabContent={[
            {
              id: "monthly",
              title: "Monthly",
              render: () => {
                return <Chart data={totalPurchasesPerMonth} />;
              },
            },
            {
              id: "daily",
              title: "Daily",
              render: () => {
                return <Chart data={totalPurchasesPerDay} />;
              },
            },
          ]}
        />
        <BottomTabs
          tabContent={[
            {
              id: "monthly",
              title: "Monthly",
              render: () => {
                return <Chart data={totalPurchasesPerMonth} />;
              },
            },
            {
              id: "daily",
              title: "Daily",
              render: () => {
                return <Chart data={totalPurchasesPerDay} />;
              },
            },
          ]}
        />
      </AppContainer>
    </>
  );
}

export default App;
