import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage/ProfileImage";
import { connect } from "react-redux";
import config from "../../config";
import ButtonWrapper from "../shared/ButtonWrapper";
import * as ACTIONS from "../../actions/userActions";
import HollowButtonWrapper from "../shared/HollowButtonWrapper";

const PROFILE_IMG_PATH = config.PROFILE_IMG_PATH;
const BUCKET_ROOT_DOMAIN = config.BUCKET_ROOT_DOMAIN;

const MainWindow = styled.div`
  border-left: 5px solid #4c394e;
  background: #fff;
  width: 80vw;
  min-width: 400px;
  min-height: 50vh;
  padding: 35px;
`;
const ImgWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  img {
    width: auto;
    height: 100%;
    position: absolute;
  }
`;

const Overlay = styled.div`
  position: absolute;
  background: black;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 0;
  transition: 0.4s;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.5;
  }
`;

const ImgSection = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: column;
`;
// const defaultModalState = {
//   profileImageModal: {
//     isOpen: false
//   },
//  imagePath : BUCKET_ROOT_DOMAIN + props.userReducer.user.profileImage.url
// };

class Account extends React.Component {
  state = {
    profileImageModal: {
      isOpen: false
    },
    imagePath: BUCKET_ROOT_DOMAIN + this.props.userReducer.user.profileImage.url
  };

  // const [getModalState, setModalState] = useState(defaultModalState);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userReducer.user.profileImage.url !== prevState.someValue) {
      return { someState: nextProps.someValue };
    } else return null;
  }
  openModal = modalType => {
    this.setState({
      [modalType]: { ...this.state[modalType], isOpen: true }
    });
  };
  closeModal = modalType => {
    this.setState({
      [modalType]: { ...this.state[modalType], isOpen: false }
    });
  };
  // const imagePath =
  //   PROFILE_IMG_PATH + props.userReducer.user.profileImage.filename;

  render() {
    console.log('props');
    console.log(this.props)
    const discardImage = () => {
      console.log(this.props);
      this.props.discardUserImage();
    };
    const temp = BUCKET_ROOT_DOMAIN + this.props.userReducer.user.profileImage.url;

    return (
      <MainWindow>
        <h1>Manage Account</h1>
        <ImgSection>
          <ImgWrapper>
            <img src={temp} key={this.state.imagePath} />
            <Overlay>
              <HollowButtonWrapper>
                <button onClick={() => this.openModal("profileImageModal")}>
                  Change Image
                </button>
              </HollowButtonWrapper>
            </Overlay>
          </ImgWrapper>
          {/* <ButtonWrapper>
          <button onClick={() => openModal("profileImageModal")}>
            Change Image
          </button>
        </ButtonWrapper> */}
          <ButtonWrapper>
            <button onClick={this.discardImage}>Discard Image</button>
          </ButtonWrapper>
        </ImgSection>
        <ProfileImage
          isOpen={this.state.profileImageModal.isOpen}
          closeModal={this.closeModal}
        />
      </MainWindow>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    discardUserImage: () => dispatch(ACTIONS.discardUserImage())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
