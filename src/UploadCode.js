import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const UploadCode = () => {
  const [file, setFile] = useState(null);
  const [uploadClicked, setUploadClicked] = useState(false);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("codeFile", file);
    console.log(file);

    axios.post("api/uploadfile", formData);
    setUploadClicked(true);
  };

  const fileData = () => {
    if (file) {
      return (
        <>
          <h3>File details :</h3>
          <p>File name : {file.name}</p>
          <p>File type : {file.type}</p>
        </>
      );
    } else {
      if (uploadClicked) {
        return (
          <>
            <br />
            <p>Choose a file before pressing the upload button</p>
          </>
        );
      }
    }
  };

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-12 offset-sm-2 col-sm-8">
            <div className="card">
              <h3 className="card-header">Upload your code!</h3>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 offset-sm-3 col-sm-3 pt-3">
                    <input type="file" onChange={onFileChange} />
                  </div>
                  <div className="col-12 col-sm-4 pt-3">
                    <Button onClick={onFileUpload}>Upload</Button>
                  </div>
                </div>
                {fileData()}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UploadCode;
