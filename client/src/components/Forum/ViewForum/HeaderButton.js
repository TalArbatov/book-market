import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as ACTIONS from '../../../actions/forumActions'
const Wrapper = styled.div`
background :#7f5c82;
height:100%;
display:flex;
flex-direction: row;
flex-wrap:no-wrap;
p {
  color: #efefef;
  font-spacing: 0.5px;
  font-weight:300;
}

`

const ButtonWrapper = styled.div `
  padding: 0 15px;
  ${ButtonWrapper}:hover {
  background:#4c394e;
  transition:0.5s;
  cursor:pointer;
}
`

const HeaderButton = props => {

  return(
      <Wrapper>
        <ButtonWrapper onClick={props.fetchTopicPosts}><p>All Posts</p></ButtonWrapper>
        <ButtonWrapper><p>Latest Activity</p></ButtonWrapper>
        <ButtonWrapper><p>My Subscriptions</p></ButtonWrapper>
        <ButtonWrapper onClick={props.fetchSavedPosts}><p >Saved</p></ButtonWrapper>

      </Wrapper>
  )
}

const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSavedPosts: () => dispatch(ACTIONS.fetchSavedPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderButton);
