// import Iframe from "react-iframe";
// import Container from "react-bootstrap/Container";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-c_cpp";
// import "ace-builds/src-noconflict/theme-xcode";
// import "ace-builds/src-noconflict/ext-language_tools";
import React from "react";
import AceEditor from "react-ace";
import { Canvas, TitleBar } from "./components";

const Visualiser = ({ code, mode }) => {
  return (
    <>
      {/* <Iframe src="../LL.html" width="100%" height="900"></Iframe> */}
      <TitleBar />
      <div style={styles.container}>
        <div style={styles.canvas}>
          <Canvas />
        </div>
        <div style={styles.canvas}>
          <AceEditor
            value={code}
            mode={mode}
            readOnly
            fontSize={16}
            width={"100%"}
            height={"99%"}
          />
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "88vh",
    flex: 1,
  },
  canvas: {
    display: "flex",
    flex: 1,
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
    margin: 16,
    marginTop: 0,
  },
};

export default Visualiser;
