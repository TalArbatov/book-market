import React from "react";
import TopicList from "./TopicList";
import styled from 'styled-components';


const StyledTr=styled.tr`
background:white;
p {
  margin: 8px 0;
}
td {
  padding-left:25px;
  
}
td:first-child {
  width:70%;
}
`

const TopicGroup = ({ topicGroup }) => {
  return (
    <>
      <StyledTr>
        <td>
          <p>{topicGroup.title}</p>
        </td>
        <td></td>
        <td></td>
      </StyledTr>
      <TopicList topics={topicGroup.topics} />
    </>
  );
};
export default TopicGroup;
