import React from 'react';
import styled from 'styled-components';
import HeaderButton from './HeaderButton';

const Wrapper = styled.div`
display:flex;
flex-direction:row;
justify-content:left;
background :#7f5c82;

height:55px;
width:100%;
`

const Header = props => {
  return(
    <Wrapper>
      <HeaderButton />
    </Wrapper>
  )
}

export default Header;