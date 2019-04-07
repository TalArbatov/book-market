import React, { useState } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import axios from "axios";
const MainWindow = styled.div`
  border-left: 5px solid #4c394e;
  background: #fff;
  width: 80vw;
  min-width: 400px;
  min-height: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const MyAccount = props => {
  const fileRef = React.createRef();
  const [getFile, setFile] = useState(0);
  const [getImgState, setImgState] = useState({ isLoaded: false, img: null });
  const submitForm2 = e => {
    e.preventDefault();
    const file = getFile;

    const formData = new FormData();
    formData.append("testFile", file);
    formData.append("token", localStorage.token);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return axios.post("/api/account/uploadPhoto", formData).then(res => {
      console.log(res.data);
    });
  };
  const setFileState = e => {
    console.log(e.target.value);
    console.log(e.target.file);
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  const sendFiles = files => {
    console.log(files);
    const formData = new FormData();
    formData.append("testFile", files[0]);
    formData.append("token", localStorage.token);
    return axios.post("/api/account/uploadPhoto", formData).then(res => {
      console.log(res.data);
    });
  };
  const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

  const getImage = () => {
    const _id = require("jsonwebtoken").decode(localStorage.token)._id;
    axios.get("/api/account/getImage/" + _id).then(res => {
      const imgBuffer = res.data.data.data;
      console.log(imgBuffer);
      // console.log(img)
      var base64Flag = "data:image/jpeg;base64,";
      var imageStr = arrayBufferToBase64(imgBuffer);
      setImgState({ isLoaded: true, img: base64Flag + imageStr });
    });
  };

  return (
    <MainWindow>
      <h1>My Account</h1>
      <Dropzone
        multiple={false}
        onDrop={acceptedFiles => sendFiles(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <form onSubmit={submitForm2}>
        <h1>File Upload</h1>
        <input type="file" name="testFile" onChange={setFileState} />
        <button type="submit">Upload</button>
      </form>
      <button onClick={getImage}>Get Image</button>
      {getImgState.isLoaded ? <div style={{borderRadius:'50%'}}><img style={{maxWidth:'90px', objectFit: 'contain'}} src={getImgState.img} /></div> : <div />}
    </MainWindow>
  );
};

export default MyAccount;