// import Iframe from "react-iframe";
// import Container from "react-bootstrap/Container";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-c_cpp";
// import "ace-builds/src-noconflict/theme-xcode";
// import "ace-builds/src-noconflict/ext-language_tools";
import React, { useState } from "react";
import AceEditor from "react-ace";
import { Canvas, TitleBar } from "./components";

const Visualiser = ({ code, mode }) => {
  const [aceMarker, setAceMarker] = useState([
    {
      startRow: 0,
      startCol: 0,
      endRow: 1,
      endCol: 0,
      className: "aceMarker",
      type: "line",
    },
  ]);

  const setMarker = (lineNo) => {
    setAceMarker((prevState) => {
      return [
        {
          ...prevState[0],
          startRow: lineNo - 1,
          endRow: lineNo,
        },
      ];
    });
  };

  return (
    <div className="visualiser">
      {/* <Iframe src="../LL.html" width="100%" height="900"></Iframe> */}
      <TitleBar />
      <div style={styles.container}>
        <div style={styles.canvas}>
          <Canvas setMarker={setMarker} />
        </div>
        <div style={styles.canvas}>
          <AceEditor
            value={code}
            mode={mode}
            markers={aceMarker}
            readOnly
            fontSize={16}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
    </div>
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
    overflow: "scroll",
  },
};

export default Visualiser;
