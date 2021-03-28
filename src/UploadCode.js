import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import { useHistory } from "react-router-dom";

let fileReader;

const UploadCode = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);
  const [uploadClicked, setUploadClicked] = useState(false);
  const history = useHistory();

  const fileNotUploaded = () => {
    return (
      <>
        <p className="pt-3">Select a file before uploading...</p>
      </>
    );
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    fileReader = new FileReader();
    fileReader.onloadend = () => {
      setContent(fileReader.result);
    };
    fileReader.readAsText(event.target.files[0]);
  };

  const onFileUpload = () => {
    setUploadClicked(true);
    if (file) {
      const formData = new FormData();
      formData.append("codeFile", file);

      axios.post("api/uploadfile", formData);

      history.push("/visualise");
    }
  };

  const fileData = () => {
    if (file) {
      return (
        <>
          <h3>Code :</h3>
          {/* <p>File name : {file.name}</p>
          <p>File type : {file.type}</p> */}
          <AceEditor
            mode="c_cpp"
            theme="xcode"
            name="fileContentEditor"
            value={content}
            readOnly={true}
            cursorStart={3}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            width="100%"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }}
          />
        </>
      );
    }
  };

  return (
    <>
      <Container className="pt-3">
        <Jumbotron>
          <h1 className="header">Welcome to Code-Viz!</h1>
        </Jumbotron>
      </Container>
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
                {uploadClicked && !file && fileNotUploaded()}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UploadCode;
