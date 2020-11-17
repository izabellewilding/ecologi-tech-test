import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Loading = ({ loading }) => {
  return (
    <LoadingContainer>
      <ClipLoader size={80} color={"#123abc"} loading={loading} />
      <p>Loading...</p>
    </LoadingContainer>
  );
};

export default Loading;
