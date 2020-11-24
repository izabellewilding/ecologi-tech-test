import React, { useState } from "react";
import styled from "styled-components";

//1. Will need to store ID of active tab in state
//2. Switch out UI onClick
//3. Customisable label

const Container = styled.div``;
const TabBar = styled.div`
  display: flex;
  justify-content: center;
`;

const Tab = styled.div`
  color: ${(props) => (props.activeTab ? "var(--primaryColor)" : "black")};
  border: solid 1px black;
  padding: 0.5rem 1rem;
  max-width: 100px;
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.activeTab ? "solid 0.2rem #258ca4" : null};
`;
const TabContent = styled.div``;

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState();
  const titles = ["Daily", "Monthly"];

  console.warn(activeTab);
  return (
    <Container>
      <TabBar>
        {titles.map((title) => (
          <Tab
            activeTab={activeTab === title}
            key={title}
            onClick={() => setActiveTab(title)}
          >
            {title}
          </Tab>
        ))}
      </TabBar>
      <TabContent>{activeTab}</TabContent>
    </Container>
  );
};

export default Tabs;
