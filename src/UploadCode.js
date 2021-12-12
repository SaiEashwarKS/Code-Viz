import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";
import { useHistory } from "react-router-dom";
import logo from "./pes.jpg";
import { ConfigContext } from "./config";
import API_ENDPOINTS from "./apiEndpoints";
import { aceModeMapper, langMapper } from "./uploadCodeUtils";
import { InputContext } from "./codeStore";
import Loader from "./components/Loader";

let fileReader;

const UploadCode = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);
  const [uploadClicked, setUploadClicked] = useState(false);
  const [apiResId, setApiResId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const history = useHistory();
  const { input, setInputContext } = useContext(InputContext);

  useEffect(() => {
    if (apiResId) {
      startTracePoll(apiResId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResId]);

  useEffect(() => {
    if (!processing && input.code && input.trace) {
      history.push("/visualise");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing, input.code, input.trace]);

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

  const handleTraceGenRes = (res) => {
    if (res.status === 200) {
      handleTraceGenResSuccess(res.data);
    }
  };

  const handleTraceGenResSuccess = (data) => {
    if (data.id) {
      setApiResId(data.id);
    }
  };

  const startTracePoll = async (id) => {
    setProcessing(true);
    const body = { id: id };
    let finished = false;
    let response;
    while (!finished) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("polling");
      // eslint-disable-next-line no-loop-func
      axios.post(API_ENDPOINTS.getTrace, body).then((res) => {
        finished = res.status === 200;
        response = res;
      });
    }
    tracePollSuccess(response.data);
  };

  const tracePollSuccess = (data) => {
    console.log("poll response", data);
    const extension = file.name.split(".")[1];
    const mode = aceModeMapper[extension];
    setInputContext({ code: content, mode, trace: data });
    setProcessing(false);
  };

  const onFileUpload = () => {
    setUploadClicked(true);
    if (file) {
      console.log(file);
      const extension = file.name.split(".")[1];
      const body = {
        language: langMapper[extension],
        code: content,
      };
      console.log(body);
      setUploading(true);
      axios.post(API_ENDPOINTS.uploadCode, body).then((res) => {
        setUploading(false);
        setProcessing(true);
        handleTraceGenRes(res);
      });

      // history.push("/visualise");
    }
  };

  const { config } = useContext(ConfigContext);
  const { Colors, isDark } = config;
  const styles = useMemo(() => getStyles(Colors), [isDark]);

  const [aceTheme, setAceTheme] = useState({ theme: "xcode" });

  useEffect(() => {
    if (isDark) {
      setAceTheme({ theme: "vibrant_ink" });
    } else {
      setAceTheme({ theme: "xcode" });
    }
  }, [isDark]);

  const fileData = () => {
    if (file) {
      return (
        <>
          <h4>Code :</h4>
          <AceEditor
            mode="c_cpp"
            {...aceTheme}
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
      {uploading && <Loader text="Uploading..." />}
      {processing && <Loader text="Processing..." />}
      <Container className="pt-3">
        <Jumbotron style={styles.jumbotron}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-sm-6">
                <h1 className="header">Welcome to Code-Viz!</h1>
              </div>
              <div
                className="d-flex col-12 col-sm-6 justify-content-center justify-content-sm-end"
                style={{ width: "100px", height: "100px" }}
              >
                <img
                  src={logo}
                  className="img-fluid"
                  alt="PES University"
                ></img>
              </div>
            </div>
          </div>
        </Jumbotron>
      </Container>
      <Container>
        <div className="row">
          <div className="col-12 offset-sm-2 col-sm-8">
            <div className="card" style={styles.card}>
              <h3 className="card-header">Upload your code</h3>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 offset-sm-3 col-sm-3 pt-3">
                    <input type="file" onChange={onFileChange} id="fileInput" />
                  </div>
                  <div className="col-12 col-sm-4 pt-3">
                    <Button
                      onClick={onFileUpload}
                      disabled={!file}
                      style={styles.button}
                    >
                      Upload
                    </Button>
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

const getStyles = (Colors) => {
  return {
    jumbotron: {
      padding: "25px",
      backgroundColor: Colors.primary_1,
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.5)",
      color: Colors.white_1,
    },
    card: {
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
      marginBottom: 16,
      backgroundColor: Colors.white_2,
      color: Colors.black,
    },
    button: {
      backgroundColor: Colors.primary_1,
      borderColor: Colors.primary_1,
      color: Colors.white_1,
      alignSelf: "center",
    },
  };
};

export default UploadCode;
