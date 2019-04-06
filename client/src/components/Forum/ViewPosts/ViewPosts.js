import React from "react";
import TopicGroupList from "./TopicGroupList";
import styled from "styled-components";
const state = {
  topicGroups: [
    {
      title: "Official News",
      topics: [
        {
          title: "Announcments",
          subtitle: "just about everytthing",
          address: 'announcments'
        },
        {
          title: "Patch Notes",
          address: 'patch-notes',
        }
      ]
    },
    {
      title: "Community",
      topics: [
        {
          title: "Random",
          address: 'random'
        },
        {
          title: "New Stores",
          address: 'new-stores',
        },
        {
          title: "Updating users",
          address: 'updating-users',
        }
      ]
    },
    {
      title: "Technical Support",
      topics: [
        {
          title: "Networking",
          address: 'networking',
        },
        {
          title: "Hardware",
          address: 'hardware',
        }
      ]
    }
  ]
};
const Table = styled.table`
  width: 100%;
  background: blue;
  border-spacing: 0;
  border-collapse: separate;
`;
const StyledTr = styled.tr`
  background: #bddff1;
  td:first-child {
    width: 70%;
  }
  td {
    padding-left: 25px;
  }
  p {
    margin: 8px 0;
    letter-spacing:1px;
    font-weight:400;
  }
`;
const ViewPosts = props => {
  return (
    <Table>
      <tbody>
        <StyledTr>
          <td>
            <p>Forum</p>
          </td>
          <td>
            <p>Posts</p>
          </td>
          <td>
            <p>Comments</p>
          </td>
         
        </StyledTr>
        <TopicGroupList topicGroups={state.topicGroups} />
      </tbody>
    </Table>
  );
};

export default ViewPosts;
