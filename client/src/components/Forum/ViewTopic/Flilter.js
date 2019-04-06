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
  display: flex;
  align-items:center;
  width: 100%;
  p {
    display: inline-block;
    padding:10px 15px;
  }

`;

const StyledUl = styled.ul`
margin:0;
  list-style-type: none;
  padding: 0;
  display: inline-flex;
  width: 100%;
  justify-content: center;
  li {
    display: inline-block;
  }
`;

const PageButton = styled.div`
  padding: 0 0;
  cursor: pointer;
  p {
    margin: 0;
    color: black;
  }
`;

const Filter = ({ pageNumbers, changePage, currentPage, lastPage }) => {
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number}>
        {/* <p style={currentPage == number ? {fontWeight:'800'} : {}}>{number}</p> */}
        <PageButton>
          <p
            style={currentPage == number ? { fontWeight: "800" } : {}}
            id={number}
            onClick={e => changePage(number)}
          >
            {number}
          </p>
        </PageButton>
      </li>
    );
  });

  return (
    <Wrapper>
      <SubWrapper>
        {/* <p>Paging:</p> */}
        <StyledUl>
          <li>
            <PageButton onClick={e => changePage(1)}>
              <p>&lt; &lt;</p>
            </PageButton>
          </li>
          <li>
            <PageButton onClick={e => changePage(currentPage - 1)}>
              <p>&lt;</p>
            </PageButton>
          </li>
          {renderPageNumbers}
          <li>
            <PageButton onClick={e => changePage(currentPage + 1)}>
              <p>&gt;</p>
            </PageButton>
          </li>
          <li>
            <PageButton onClick={e => changePage(lastPage)}>
              <p>&gt; &gt;</p>
            </PageButton>
          </li>
        </StyledUl>
      </SubWrapper>
      <div>{/* <p>Filter</p> */}</div>
    </Wrapper>
  );
};

export default Filter;
