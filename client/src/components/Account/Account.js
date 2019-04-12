import React, { useState } from "react";
import styled from "styled-components";
import ProfileImage from "./ProfileImage/ProfileImage";
import { connect } from "react-redux";
import config from "../../config";
import ButtonWrapper from "../shared/ButtonWrapper";
import * as ACTIONS from '../../actions/userActions';
import HollowButtonWrapper from '../shared/HollowButtonWrapper';




const PROFILE_IMG_PATH = config.PROFILE_IMG_PATH;

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
  display:flex;
  justify-content:center;
  img {
    width: auto;
    height: 100%;
    position:absolute;
  }
`;

const Overlay = styled.div`
  position:absolute;
  background:black;
  width: 100%;
  height: 100%;
  opacity:0;
  z-index:0;
  transition:0.4s;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  &:hover {
    opacity:0.5;
  }
`


const ImgSection = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: column;
`;
const defaultModalState = {
  profileImageModal: {
    isOpen: false
  }
};

const Account = props => {
  const [getModalState, setModalState] = useState(defaultModalState);

  const openModal = modalType => {
    setModalState({
      ...getModalState,
      [modalType]: { ...getModalState[modalType], isOpen: true }
    });
  };
  const closeModal = modalType => {
    setModalState({
      ...getModalState,
      [modalType]: { ...getModalState[modalType], isOpen: false }
    });
  };
  const imagePath =
    PROFILE_IMG_PATH + props.userReducer.user.profileImage.filename;

  const discardImage = () => {
    props.discardUserImage();
  };

  return (
    <MainWindow>
      <h1>Manage Account</h1>
      <ImgSection>
        <ImgWrapper>
          <img src={imagePath} />
          <Overlay>
            <HollowButtonWrapper>
              <button onClick={() => openModal("profileImageModal")}>Change Image</button>
            </HollowButtonWrapper>
          </Overlay>
        </ImgWrapper>
        {/* <ButtonWrapper>
          <button onClick={() => openModal("profileImageModal")}>
            Change Image
          </button>
        </ButtonWrapper> */}
        <ButtonWrapper>
          <button onClick={discardImage}>Discard Image</button>
        </ButtonWrapper>
      </ImgSection>
      <ProfileImage
        isOpen={getModalState.profileImageModal.isOpen}
        closeModal={closeModal}
      />
    </MainWindow>
  );
};

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
