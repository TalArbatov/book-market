import React from 'react';
import styled from 'styled-components'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const Wrapper = styled.div`
display: flex;
flex-direction:column;
`

const VotePost = props => {
  return(
    <Wrapper>
      <KeyboardArrowUp></KeyboardArrowUp>
      <KeyboardArrowDown></KeyboardArrowDown>
    </Wrapper>
  )
}
export default VotePost;