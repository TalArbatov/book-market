import React, { useState } from "react";
import styled from "styled-components";
import Star from "@material-ui/icons/Star";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import PopWindow from "../PopWindow";

const OptionsBadge = ({ post }) => {
  return (
    <>
      <Tooltip title="More options">
        <PopWindow post={post} />
      </Tooltip>
    </>
  );
};

export default OptionsBadge;
