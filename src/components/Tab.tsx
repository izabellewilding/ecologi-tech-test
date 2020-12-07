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

const Tab = styled.a<{ activeTab: boolean}>`
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

type Props = {
  tabContent: TabContent[]
}

type TabContent = {
id: string,
title: string,
render: () => JSX.Element
}

function useTabs({tabContent}: Props) {
  const [activeTab, setActiveTab] = useState(tabContent[0]);

  return {
    activeTab,
    renderTabBar: () => (
      <TabBar role="tablist">
        {tabContent.map((tabItem) => (
          <Tab
            activeTab={activeTab.id === tabItem.id}
            key={tabItem.title}
            onClick={() => setActiveTab(tabItem)}
            role="tab"
          >
            {tabItem.title}
          </Tab>
        ))}
      </TabBar>
    ),
  };
}

export const TopTabs = (props: Props) => {
  const { renderTabBar, activeTab } = useTabs(props);

  return (
    <Container>
      {renderTabBar()}
      <TabContent>{activeTab.render()}</TabContent>
    </Container>
  );
};

export const BottomTabs = (props: Props) => {
  const { renderTabBar, activeTab } = useTabs(props);

  return (
    <Container>
      <TabContent>{activeTab.render()}</TabContent>
      {renderTabBar()}
    </Container>
  );
};
