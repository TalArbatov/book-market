import styled from 'styled-components';
import React from 'react';

const DisabledButtonWrapper = styled.div`
  button {
    padding: 8px 18px;
    background: #8e828f;
    border-radius: 4px;
    color: white;
    cursor: default !important;
    font-size: 0.95em;
    font-weight: 100;
  }
 
`;

export default DisabledButtonWrapper;