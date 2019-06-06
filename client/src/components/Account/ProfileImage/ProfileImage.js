import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import config from "../../../config";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/userActions";
import formatDate from "../../../utils/formatDate";
import ButtonWrapper from "../../shared/ButtonWrapper";
import Modal from "react-modal";
import DisabledButtonWrapper from "../../shared/DisabledButtonWrapper";
import HollowButtonWrapper from "../../shared/HollowButtonWrapper";

const PROFILE_IMG_PATH = config.PROFILE_IMG_PATH;
const BUCKET_ROOT_DOMAIN = config.BUCKET_ROOT_DOMAIN;
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "100"
  }
};

const ImgWrapper = styled.div`
  display: inline-block;
  position: relative;
  max-width: 90vw;
  max-height: 50vh;
  img {
    max-width: 90vw;
    max-height: 60vh;
  }
`;

const Overlay = styled.div`
  position: absolute;
overflow: hidden;
  opacity: 0.5;
  z-index: 2;
  border-radius:50%;
  transition: 0.4s;
  background:white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, 0);
  left: 50%;
`;

const BlackOverlay = styled.div`
  opacity:0.5;
  z-index:1;
  transition:0.4s;
  background:black;
  position:absolute;
`

const DropzoneWrapper = styled.div`
  border: 10px dashed grey;
  padding: 25px;
  min-height: 200px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  p {
    color: grey;
    font-size: 1.3em;
    word-wrap: break-word;
  }
`;

const AfterUploadWrapper = styled.div`
  max-width: 90vw;
  max-height: 70vh;
  position: relative;
`;

//formData may be deprecated after AWS refactor

const defaultState = {
  formData: null,
  file: null,
  imgSrc: null,
  minValue: 0,
  minType: 'width',
  file: null,
};
const AfterUploadContent = styled.div``;
const ModalContent = styled.div``;
const ProfileImage = props => {
  const [getState, setState] = useState(defaultState);

  const sendFiles = () => {
    props.uploadUserImage(getState.file);
    setState(defaultState);
    closeModal();
  };

  const createFormData = files => {
    console.log(files);
    const formData = new FormData();
    formData.append("testFile", files[0]);
    formData.append("token", localStorage.token);
    //setState({ ...getState, formData, file: files[0]});

    const reader = new FileReader();
    var url = reader.readAsDataURL(files[0]);
    reader.onloadend = function(e) {
      // this.setState({
      //   imgSrc: [reader.result]
      // });
      setState({ ...getState, formData, imgSrc: [reader.result] , file: files[0]});
    }.bind(this);
    console.log(url); // Would see a path?
    console.log(reader);
    // TODO: concat files
  };

  const closeModal = () => {
    props.closeModal("profileImageModal");
  };
  // const imagePath =
  //   PROFILE_IMG_PATH + props.userReducer.user.profileImage.filename;
const imagePath = BUCKET_ROOT_DOMAIN + props.userReducer.user.profileImage.url
  const onImgLoad = e => {
    try {
      const height = e.target.offsetHeight;
      const width = e.target.offsetWidth;
      if (height < width) setState({ ...getState, minValue: height, minType: 'height' });
      else setState({ ...getState, minValue: width, minType: 'width' });
      console.log("finished onImgLoad");
    } catch (e) {
      console.log("cought!");
    }
  };

  const discardChange = () => {
    setState(defaultState);
  };

  // const overlayStyle = getState.minType == 'width' ? {
  //   height: '100%',
  //   width: getState.minValue,
  // } : {
  //   height: getState.minValue,
  //   width: '100%'
  // }
  const AfterUpload = (
    <>
      <AfterUploadWrapper>
        <AfterUploadContent>
          <Overlay
           style={{height:getState.minValue, width:getState.minValue}}
          >
            <HollowButtonWrapper>
            </HollowButtonWrapper>
          </Overlay>
          {/* <BlackOverlay></BlackOverlay> */}
          {getState.imgSrc != null && (
            <ImgWrapper>
              <img onLoad={e => onImgLoad(e)} src={getState.imgSrc} />
            </ImgWrapper>
          )}
        </AfterUploadContent>
      </AfterUploadWrapper>
      <ButtonWrapper>
        <button onClick={sendFiles}>Upload Image</button>
        <button onClick={discardChange}>Discard</button>
        <button onClick={closeModal}>Cancel</button>
      </ButtonWrapper>
    </>
  );

  const BeforeUpload = (
    <>
      <DropzoneWrapper>
        <Dropzone
          multiple={false}
          onDrop={acceptedFiles => createFormData(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag photo here</p>
              </div>
            </section>
          )}
        </Dropzone>
      </DropzoneWrapper>
      <DisabledButtonWrapper>
        <button disabled>Upload Image</button>
      </DisabledButtonWrapper>
      <ButtonWrapper>
      <button onClick={closeModal}>Cancel</button>
      </ButtonWrapper>
    </>
  );
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalContent>
        {getState.formData != null ? AfterUpload : BeforeUpload}

        {/* {getState.formData != null ? (
          <ButtonWrapper>
            <button onClick={sendFiles}>Upload Image</button>
          </ButtonWrapper>
        ) : (
          <DisabledButtonWrapper>
            <button disabled>Upload Image</button>
          </DisabledButtonWrapper> */}
      </ModalContent>
    </Modal>
  );
};
const mapStateToProps = state => {
  return {
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: _id => dispatch(ACTIONS.fetchUser(_id)),
    uploadUserImage: formData => dispatch(ACTIONS.uploadUserImage(formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileImage);
