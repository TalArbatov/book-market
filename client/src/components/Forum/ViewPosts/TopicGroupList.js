import React, { Fragment } from "react";
import TopicGroup from "./TopicGroup";

const TopicGroupList = ({ topicGroups }) => {
  return (
    <>
      {topicGroups.map((topicGroup, index) => {
        return <TopicGroup key={index} topicGroup={topicGroup} />;
      })}
    </>
  );
};

export default TopicGroupList;
