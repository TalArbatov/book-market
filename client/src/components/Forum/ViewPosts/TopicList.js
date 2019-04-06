import React from "react";
import Topic from "./Topic";

const TopicList = ({ topics }) => {
  return (
    <>
      {topics.map((topic, index) => {
        return <Topic key={index} topic={topic} />;
      })}
    </>
  );
};

export default TopicList;
