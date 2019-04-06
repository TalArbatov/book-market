import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background: white;

  height: 55px;
  width: 100%;
`;
const SubWrapper = styled.div`
  display: inline-block;
  width: 100%;
  p {
    display: inline-block;
  }
`;

const StyledUl = styled.ul`
  list-style-type: none;
  display: inline-block;
  li {
    display: inline-block;
    margin: 0 10px;
  }
`;

const Filter = ({ pageNumbers, changePage }) => {
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number} id={number} onClick={changePage}>
        {number}
      </li>
    );
  });

  return (
    <Wrapper>
      <SubWrapper>
        <p>Paging:</p>
        <StyledUl>
          <li><p>&lt;</p></li>
        {renderPageNumbers}
        <li><p>&gt;</p></li>
        </StyledUl>
      </SubWrapper>
      <div>
        <p>Filter</p>
      </div>
    </Wrapper>
  );
};

export default Filter;
