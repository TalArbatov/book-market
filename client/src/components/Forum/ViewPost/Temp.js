import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { isAbsolute } from "path";

const Container = styled.div``;

const Dots = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 25px;
  padding: 10px;
  border: 1px solid black;
  margin: 10px;
  div {
    height: 5px;
    width: 5px;
    background: grey;
    border-radius: 50%;
  }
`;
const Window = styled.div``;
const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(255, 255, 255, 0.75);
z-index:2;
`;
const Content = styled.div``;

const Temp = props => {
  const [getState, setState] = useState({
    modalIsOpen: false,
    mouse: { x: 0, y: 0 }
  });

  const openModal = e => {
    const mouse = {
      x: event.pageX,
      y: event.pageY
    };
    setState({ ...getState, modalIsOpen: true, mouse });
    //console.log(e);
    console.log(getState);
  };
  const closeModal = () => {
    setState({ ...getState, modalIsOpen: false });
    console.log(getState);
  };

  return (
    <>
      <Container>
        <Dots onClick={openModal}>
          <div />
          <div />
          <div />
        </Dots>
      </Container>
      <Window style={{ display: getState.modalIsOpen ? "block" : "none" , position:'absolute'}}>
        <Overlay onClick={closeModal}>
        <Content
          style={{
            background:'white',
            top: getState.mouse.y,
            left: getState.mouse.x,
            position: "absolute",
            border: "1px solid black",
            zIndex: "3"
          }}
        >
          <h1>TEST</h1>
          <button onClick={closeModal}>close</button>
        </Content>
        </Overlay>

      </Window>
      {/* <Modal
        isOpen={getState.modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
           // backgroundColor: "unset"
          },
          content: {
            top: getState.mouse.y,
            left: getState.mouse.x
          }
        }}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal> */}
    </>
  );
};

export default Temp;
